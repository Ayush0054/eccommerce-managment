package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

// var jwtSecret = []byte("ayush")

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")

		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Not authorized, no token"})
			c.Abort()
			return
		}

		if len(tokenString) < 7 || tokenString[:7] != "Bearer " {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Not authorized, invalid token format"})
			c.Abort()
			return
		}

		tokenString = tokenString[7:]

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Not authorized, token failed"})
			c.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Not authorized, invalid token"})
			c.Abort()
			return
	}

		// You can access the user ID from the claims here
	 userID := claims["seller_id"].(string)

		// You can store the user data in the request context if needed
		c.Set("user", userID)

		c.Next()
	}
}
