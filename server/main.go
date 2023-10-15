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
    CustomerFirstName   string    `gorm:"column:order_customer_first_name"`
    CustomerLastName    string    `gorm:"column:order_customer_last_name"`
    CustomerEmail       string    `gorm:"column:order_customer_email"`
    CustomerPhone       string    `gorm:"column:order_customer_phone"`
    CustomerAddress     string       `gorm:"column:order_customer_address"`
    CreatedAt           time.Time    `gorm:"column:order_created_at"`
    Products            string     `gorm:"column:order_products"`
    SellerId            uuid.UUID  `gorm:"foreignKey:seller_id;type:uuid;column:order_seller_id"` // "foreign key" to struct Seller
  
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

    db.AutoMigrate( &Order{}, &Shipment{}, &Checkpoint{})
    r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"} // Add your frontend's URL here
	config.AllowMethods = []string{"GET", "PUT", "POST", "DELETE"} // Add the allowed HTTP methods
	r.Use(cors.New(config))

    r.GET("/api/orders", listOrders)
	r.POST("/api/orders", createOrder)

    // r.PUT("/api/orders/:id", updateShipmentStatus)
    // r.POST("/api/signup", sellerSignup)
	// r.POST("/api/login", sellerLogin)

    r.Run(":8080")
}

func listOrders(c *gin.Context) {
    var orders []Order
    db.Find(&orders)

    c.JSON(http.StatusOK, orders)
}

func createOrder(c *gin.Context) {
    // Parse the request JSON body into an Order struct
    var newOrder Order
	if newOrder.Id == uuid.Nil {
        newOrder.Id = uuid.New()
    }
    if err := c.ShouldBindJSON(&newOrder); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Insert the new order into the database
    result := db.Create(&newOrder)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
        return
    }

    // Return the newly created order as a response
    c.JSON(http.StatusCreated, newOrder)
}


func updateShipmentStatus(c *gin.Context) {
    // Get the order ID from the URL parameter
    orderID := c.Param("id")

    // Parse the new shipment status from the request body
    var requestBody struct {
        ShipmentStatus string `json:"shipmentStatus"`
    }

    if err := c.ShouldBindJSON(&requestBody); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Find the order by ID
    var order Order
    if db.First(&order, orderID).RecordNotFound() {
        c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
        return
    }

    // Update the shipment status
    order.ShipmentStatus = requestBody.ShipmentStatus
    db.Save(&order)

    c.JSON(http.StatusOK, order)
}

