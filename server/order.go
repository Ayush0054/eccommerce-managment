package main

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func addOrder(c *gin.Context) {
var input struct {
	CustomerEmail      string    `json:"customer_email"`
	ProductID          uuid.UUID `json:"product_id"`
	Quantity           int       `json:"quantity"`
	CustomerFirstName  string    `json:"customer_first_name"`
	CustomerLastName   string    `json:"customer_last_name"`
	CustomerAddress    string    `json:"customer_address"`
	CustomerPhone      string    `json:"customer_phone"`
}

if err := c.ShouldBindJSON(&input); err != nil {
	c.JSON(400, gin.H{"error": err.Error()})
	return
}

    // Assuming you have a database connection in the "db" variable.
    var product Product
    if err := db.Where("product_id = ?", input.ProductID).First(&product).Error; err != nil {
        c.JSON(404, gin.H{"error": "Product not found"})
        return
    }
	userString := c.MustGet("user").(string)
	sellerID, err := uuid.Parse(userString)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to parse seller ID"})
		return
	}
    // Check if a customer with the given email already exists
	var existingCustomer Customer
	
	if result := db.Where("customer_email = ?", input.CustomerEmail).First(&existingCustomer); result.Error == nil {
		// Customer already exists, add the product ID to their ProductIDs array
        existingCustomer.TotalOrders ++
        existingCustomer.TotalSpent=  existingCustomer.TotalSpent + (float32(input.Quantity) * product.Price)
		existingCustomer.ProductId = input.ProductID 
        if err := db.Save(&existingCustomer).Error; err != nil {	
			c.JSON(500, gin.H{"error": "Failed to update customer"})
			return
		}
		return
	}
	   
		// Customer doesn't exist, create a new one
		customer := Customer{
			Id:          uuid.New(),
			FirstName:   input.CustomerFirstName,
			LastName:    input.CustomerLastName,
			Email:       input.CustomerEmail,
			Phone:       input.CustomerPhone,
			Address:     input.CustomerAddress,
			CreatedAt:   time.Now(),
            TotalOrders: 1,
            TotalSpent: float32(input.Quantity) * product.Price,
            SellerId:   sellerID,
            ProductId:  input.ProductID,
		}
            
		result := db.Create(&customer); 
		if result.Error != nil {
			c.JSON(500, gin.H{"error": "Failed to create customer"})
			return
		}
	

    // Get the product details
 
    // Calculate order total
    orderTotal := float32(input.Quantity) * product.Price

    // Create a new order
    order := Order{
        Id:          uuid.New(),
        OrderTotal:  orderTotal,
        OrderNumber: uuid.New().String(),
        CustomerId:  customer.Id, // Use the customer's ID
        CreatedAt:   time.Now(),
        SellerId:    sellerID, // Assuming "user" in the context is the seller ID
        ProductId:   input.ProductID,
        Status:      "pending",
        Quantity:    input.Quantity,
    }

    // Create the order in the database
    if err := db.Create(&order).Error; err != nil {
        c.JSON(500, gin.H{"error": "Failed to create order"})
        return
    }

    // Update the product's sales and quantity
    product.Sales += input.Quantity
    product.Quantity -= input.Quantity
    if product.Quantity < 0 {
        c.JSON(400, gin.H{"error": "Not enough stock"})
        return
    }
    if err := db.Save(&product).Error; err != nil {
        c.JSON(500, gin.H{"error": "Failed to update product sales and quantity"})
        return
    }

    // Update the seller's sales information
    // var sales Sales
    // if err := db.Where("seller_id = ?", order.SellerId).First(&sales).Error; err != nil {
    //     // Create a new sales record if it doesn't exist
    //     sales = Sales{
    //         Id:           uuid.New(),
    //         TotalSales:   0,
    //         TotalOrders:  0,
    //         TotalRevenue: 0.0,
    //         DailyRevenue: 0.0,
    //         CreatedAt:    time.Now(),
    //         SellerId:     order.SellerId,
    //     }
    // }

    // sales.TotalSales += input.Quantity
    // sales.TotalOrders++
    // sales.TotalRevenue += orderTotal
    // sales.DailyRevenue += orderTotal

    // if err := db.Save(&sales).Error; err != nil {
    //     c.JSON(500, gin.H{"error": "Failed to update sales information"})
    //     return
    // }
    var seller Seller
    if err := db.Where("seller_id = ?", order.SellerId).First(&seller).Error; err != nil {
        c.JSON(404, gin.H{"error": "Seller not found"})
        return
    }

    seller.TotalOrders+= input.Quantity
    seller.TotalRevenue += orderTotal
    seller.DailyRevenue += orderTotal
  
if err := db.Save(&seller).Error; err != nil {
        c.JSON(500, gin.H{"error": "Failed to update sales information"})
        return
    }
    c.JSON(201, gin.H{"message": "Order created successfully!"})
}

func fetchOrders(c *gin.Context) {
    var orders []Order
    sellerID := c.MustGet("user").(string)
    if err := db.Where("order_seller_id = ?", sellerID).Find(&orders).Error; err != nil {
        c.JSON(500, gin.H{"error": "Failed to fetch orders"})
        return
    }
    c.JSON(200, orders)
}
func findCustomerById(c *gin.Context) {
    var customer Customer
    if db.First(&customer, c.Param("id")) == nil {
        c.JSON(404, gin.H{"error": "Customer not found"})
        return
    }
    c.JSON(200, customer)
}
func fetchCustomers(c *gin.Context) {
    var customers []Customer
    sellerID := c.MustGet("user").(string)
  
    if err := db.Where("customer_seller_id = ?",sellerID ).Find(&customers).Error; err != nil {
        c.JSON(500, gin.H{"error": "Failed to fetch customers"})
        return
    }
    c.JSON(200, customers)
}