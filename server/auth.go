package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)
var jwtSecret = []byte("ayush")
type Seller struct {
    Id                  uuid.UUID `gorm:"primaryKey;type:uuid;column:seller_id"`
    Name                string    `gorm:"column:seller_name"`
    Email               string    `gorm:"column:seller_email"`
    Password            string    `gorm:"column:seller_password"`
    Phone               string    `gorm:"column:seller_phone"`
    Address             string    `gorm:"column:seller_address"`
    TotalOrders         int       `gorm:"column:seller_total_orders"`
    TotalRevenue        float32   `gorm:"column:seller_total_revenue"`
	DailyRevenue        float32   `gorm:"column:seller_daily_revenue"`
    TotalProducts       int       `gorm:"column:seller_total_products"`
    TotalCustomers      int       `gorm:"column:seller_total_customers"`
    TotalShippedOrders  int       `gorm:"column:seller_total_shipped_orders"`
    TotalReturnedOrders int       `gorm:"column:seller_total_returned_orders"`
}

// SellerLoginRequest struct for seller login request
type SellerLoginModel struct {
	ID       uint      `gorm:"primaryKey"`
	Email    string    `gorm:"column:seller_email"`
	Password string    `gorm:"column:seller_password"`
}

type SellerAuthResponse struct {
	Token string `json:"token"`
	Seller Seller `json:"seller"`
}
func sellerSignup(c *gin.Context) {
	var signupRequest Seller
	if err := c.ShouldBindJSON(&signupRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// // Check if the email is already registered
	var existingSeller Seller
	if result := db.Where("seller_email = ?", signupRequest.Email).First(&existingSeller); result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(signupRequest.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Create a new seller record
	newSeller := Seller{
		Id:    uuid.New(),
		Name:  signupRequest.Name,
		Email: signupRequest.Email,
		// Store the hashed password in the database
		Password: string(hashedPassword),
		Phone:    signupRequest.Phone,
		Address:   signupRequest.Address,
		TotalOrders: 0,
		TotalRevenue: 0,
		DailyRevenue: 0,
		TotalProducts: 0,
		TotalCustomers: 0,
		TotalShippedOrders: 0,
		TotalReturnedOrders: 0,	
	}

	result := db.Create(&newSeller)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create seller"})
		fmt.Println(result.Error)
		return
	}

	// Generate a JWT token for the seller
	// token := generateToken(newSeller.Id)
	// response := SellerAuthResponse{Token: token}

	c.IndentedJSON(http.StatusCreated, result)
}

func sellerLogin(c *gin.Context) {
	var loginRequest SellerLoginModel
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Retrieve the seller with the provided email
	var seller Seller
	fmt.Println(loginRequest.Email,"hey")
	result := db.Where("seller_email = ?", loginRequest.Email).First(&seller)
	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Compare the hashed password with the provided password
	err := bcrypt.CompareHashAndPassword([]byte(seller.Password), []byte(loginRequest.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}
	var gseller Seller
	if err := db.Where("seller_email = ?", loginRequest.Email).Omit("Password").First(&gseller).Error; err != nil {
		// Handle error
		c.JSON(500, gin.H{"error": "Failed to fetch seller"}) 
		return
	  }	
	// Generate a JWT token for the seller
	token := generateToken(seller.Id)
	response := SellerAuthResponse{Token: token, Seller: gseller }
    fmt.Println(response)
	fmt.Println(token)
	c.JSON(http.StatusOK, response)
}
func generateToken(sellerID uuid.UUID) string {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["seller_id"] = sellerID
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix() // Token expires in 24 hours

	tokenString, _ := token.SignedString(jwtSecret)
	return tokenString
}