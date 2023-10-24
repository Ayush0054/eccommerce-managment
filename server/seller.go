package main

import (
	"github.com/gin-gonic/gin"
)

func SellerDetails(c *gin.Context){
	sellerID := c.Param("seller_id")
	var seller Seller
	if err := db.Where("id = ?", sellerID).First(&seller).Error; err != nil {
		// Handle error
		c.JSON(500, gin.H{"error": "Failed to fetch seller"}) 
		return
	  }	
	c.JSON(200, gin.H{"seller": seller})
}