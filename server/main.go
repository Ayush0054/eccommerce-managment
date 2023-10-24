package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB


type Order struct {

    Id                  uuid.UUID `gorm:"primaryKey;type:uuid;column:order_id"` 
    OrderTotal          float32   `gorm:"column:order_order_total"`
    OrderNumber         string    `gorm:"column:order_order_number"`
    CustomerId         uuid.UUID `gorm:"foreignKey:customer_id;type:uuid;column:order_customer_id"` // "foreign key" to struct Customer
    CreatedAt           time.Time    `gorm:"column:order_created_at"`
    SellerId            uuid.UUID  `gorm:"foreignKey:seller_id;type:uuid;column:order_seller_id"` // "foreign key" to struct Seller
    ProductId          uuid.UUID  `gorm:"foreignKey:product_id;type:uuid;column:order_product_id"` // "foreign key" to struct Product
    status              string    `gorm:"column:order_status"` 
    Quantity            int       `gorm:"column:order_quantity"`

}
type Sales struct {
    Id                  uuid.UUID `gorm:"primaryKey;type:uuid;column:sales_id"`
    TotalSales          float32   `gorm:"column:sales_total_sales"`
    TotalOrders         int       `gorm:"column:sales_total_orders"`
    TotalRevenue        float32   `gorm:"column:sales_total_revenue"`
    DailyRevenue        float32   `gorm:"column:sales_daily_revenue"`
    CreatedAt           time.Time `gorm:"column:sales_created_at"`
    SellerId            uuid.UUID `gorm:"foreignKey:seller_id;type:uuid;column:sales_seller_id"` // "foreign key" to struct Seller
}
type Product struct {
    Id                  uuid.UUID `gorm:"primaryKey;type:uuid;column:product_id"`
    Name                string    `gorm:"column:product_name"`
    Description         string    `gorm:"column:product_description"`
    Price               float32   `gorm:"column:product_price"`
    Quantity            int       `gorm:"column:product_quantity"`
    CreatedAt           time.Time `gorm:"column:product_created_at"`
    Sales              int       `gorm:"column:product_sales"`
}
type Customer struct {
    Id                  uuid.UUID `gorm:"primaryKey;type:uuid;column:customer_id"`
    FirstName           string    `gorm:"column:customer_first_name"`
    LastName            string    `gorm:"column:customer_last_name"`
    Email               string    `gorm:"column:customer_email"`
    Phone               string    `gorm:"column:customer_phone"`
    Address             string    `gorm:"column:customer_address"`
    CreatedAt           time.Time `gorm:"column:customer_created_at"`

}
type Shipment struct {
	Id                      uuid.UUID          `gorm:"primaryKey;type:uuid;column:shipment_id"`
	OrderId                 uuid.UUID          `gorm:"foreignKey:order_id;type:uuid;column:shipment_order_id"`       
	Status                  string             `gorm:"column:shipment_status"`
	ProviderFulfillmentId   string             `gorm:"column:shipment_provider_fulfillment_id"` // For provider like shopify. Not to mix with courierTrackingId
	CarrierName             string             `gorm:"column:shipment_carrier_name"`
	CarrierCode             string             `gorm:"column:shipment_carrier_code"`
	CarrierTrackingNumber   string             `gorm:"column:shipment_carrier_tracking_number"`
	EstimatedDeliveryDate   time.Time          `gorm:"column:shipment_estimated_delivery_date"`
	ActualDeliveryDate      time.Time          `gorm:"column:shipment_actual_delivery_date"`
	CreatedAt               time.Time          `gorm:"column:shipment_created_at"`
	Summary                 string             `gorm:"column:shipment_summary"`
	DestinationCity         string             `gorm:"column:shipment_destination_city"`
	OriginCity              string             `gorm:"column:shipment_origin_city"`
	ReturnShipmentId        uuid.UUID          `gorm:"foreignKey:shipment_id;type:uuid;column:shipment_return_shipment_id"` // "foreign key" to struct Shipment
	TrackerId               string             `gorm:"column:shipment_tracker_id"`
    

}

type Checkpoint struct {
	Id             uuid.UUID      `gorm:"primaryKey;type:uuid;column:checkpoint_id"`
	ShipmentId     uuid.UUID      `gorm:"foreignKey:shipment_id;type:uuid;column:checkpoint_shipment_id"` // "foreign key" to struct Shipment
	Status           string  `gorm:"column:checkpoint_status"`
	Title          string         `gorm:"column:checkpoint_title"`
	Timestamp      time.Time      `gorm:"column:checkpoint_timestamp"`
	TrackerEventId string         `gorm:"column:checkpoint_tracker_event_id"`
	CreatedAt      time.Time      `gorm:"column:checkpoint_created_at"`
}
func main() {
    dsn := "host=localhost port=5432 dbname=eccomerce user=postgres password=123456 sslmode=prefer connect_timeout=10"
    var err error
    db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	fmt.Println("db", db)
    if err != nil {
        panic("Failed to connect to the database")
    }

    db.AutoMigrate(  &Seller{}  ) 
    r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"} // Add your frontend's URL here
	config.AllowMethods = []string{"GET", "PUT", "POST", "DELETE"} // Add the allowed HTTP methods
	r.Use(cors.New(config))

    r.GET("/api/orders", authMiddleware() , listOrders)
	r.POST("/api/orders",authMiddleware() , createOrder)

    // r.PUT("/api/orders/:id", updateShipmentStatus)
    r.POST("/api/signup", sellerSignup)
	r.POST("/api/login", sellerLogin)
    r.GET("/api/sellerDetail", authMiddleware(), SellerDetails)
    r.Run(":8080")
}

func listOrders(c *gin.Context) {
    var orders []Order
    db.Find(&orders)

    c.JSON(http.StatusOK, orders)
}


// func createOrder(c *gin.Context) {
//     var newOrder Order
//     if newOrder.Id == uuid.Nil {
//         newOrder.Id = uuid.New()
//     }
//     if err := c.ShouldBindJSON(&newOrder); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }
//     result := db.Create(&newOrder)
//     if result.Error != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
//         return
//     }
//     c.JSON(http.StatusCreated, newOrder)
// }
func createOrder(c *gin.Context) {

    // Get input data 
    var input struct {
      customer  Customer
      product  Product
      order  Order 
    }
    if err := c.ShouldBindJSON(&input); err != nil {
      c.JSON(400, gin.H{"error": err.Error()})
      return
    }
  
    // Get product to decrement quantity
    var product Product 
    if err := db.Where("id = ?", input.product).First(&product).Error; err != nil {
      c.JSON(500, gin.H{"error": "Failed to find product"})  
      return
    }
  
    // Get seller info from context 
    sellerID := c.MustGet("current_user_id") // logged in user
  
    // Create customer
    if err := db.Create(&input.customer).Error; err != nil {
      c.JSON(500, gin.H{"error": "Failed to create customer"})
      return  
    }
  
    // Create order
    input.order.CustomerId = input.customer.Id
    input.order.SellerId  = c.MustGet("user").(uuid.UUID)
    input.order.ProductId = input.product.Id
  input.order.OrderTotal = input.product.Price * float32(input.order.Quantity)
  input.order.OrderNumber = uuid.New().String()
  input.order.CreatedAt = time.Now()
  input.order.status = "pending"
  input.order.Quantity = input.order.Quantity
    if err := db.Create(&input.order).Error; err != nil {
      c.JSON(500, gin.H{"error": "Failed to create order"})
      return
    }
  
    // Update product quantity
    product.Quantity -= input.order.Quantity
    db.Save(&product)
  
    // Update seller revenue
    db.Exec("UPDATE sellers SET daily_revenue = daily_revenue + ? WHERE id = ?", 
      input.order.OrderTotal , sellerID)
  
    c.JSON(201, gin.H{"message": "Order created successfully!"})
  }
// func  listsales(c *gin.Context) {
//     var sales []Order
//     db.Find(&sales)
//     c.JSON(http.StatusOK, sales)
// }
// func listinventory(c *gin.Context) {
//     var inventory []Order
//     db.Find(&inventory)
//     c.JSON(http.StatusOK, inventory)
// }
func listcustomers(c *gin.Context) {
    var customers []Customer
    db.Find(&customers)
    c.JSON(http.StatusOK, customers)
}
func listproducts(c *gin.Context) {
    var products []Product
    db.Find(&products)
    c.JSON(http.StatusOK, products)
}
func addProducts( c *gin.Context) {
    var newProduct Product
    if newProduct.Id == uuid.Nil {
        newProduct.Id = uuid.New()
    }
    if err := c.ShouldBindJSON(&newProduct); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    result := db.Create(&newProduct)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create product"})
        return
    }
    c.JSON(http.StatusCreated, newProduct)
}
func increaseProductbyId ( c *gin.Context ){
    var product Product
    if db.First(&product, c.Param("id")) == nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
        return
    }
    var requestBody struct {
        Quantity int `json:"quantity"`
    }
    if err := c.ShouldBindJSON(&requestBody); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    product.Quantity += requestBody.Quantity
    db.Save(&product)
    c.JSON(http.StatusOK, product)
}
// func updateShipmentStatus(c *gin.Context) {
//     // Get the order ID from the URL parameter
//     orderID := c.Param("id")

//     // Parse the new shipment status from the request body
//     var requestBody struct {
//         ShipmentStatus string `json:"shipmentStatus"`
//     }

//     if err := c.ShouldBindJSON(&requestBody); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     // Find the order by ID
//     var order Order
//     if db.First(&order, orderID).RecordNotFound() {
//         c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
//         return
//     }

//     // Update the shipment status
//     order.ShipmentStatus = requestBody.ShipmentStatus
//     db.Save(&order)

//     c.JSON(http.StatusOK, order)
// }

