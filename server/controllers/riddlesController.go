package controllers

import (
	"aoj/initializers"
	"aoj/models"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetRiddles(c *gin.Context) {
	var riddles []models.Riddle

	initializers.DB.Find(&riddles)
	c.JSON(http.StatusOK, riddles)
}
func GetRiddlesById(c *gin.Context) {
	id := c.Param("id")
	var riddle models.Riddle

	initializers.DB.First(&riddle, id)
	c.JSON(http.StatusOK, riddle)
}
func SolveRiddle(c *gin.Context) {
	// Get API key from HTTP header, riddle answer from request body
	apiKey := c.Request.Header.Get("X-API-Key")
	var body models.Riddle
	// Validate that API key matches expected value; else status unauthorized and return
	if apiKey != os.Getenv("X-API-Key") {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid API key",
		})
		return
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}
	// Convert submitted answer to lower and trim whitespace
	answer := strings.TrimSpace(strings.ToLower(body.Answer))
	// Pull riddleAnswer from DB; ID comes from PUT request
	id := c.Param("id")
	riddleAnswer := retrieveRiddleAnswer(id)
	// Compare submitted answer to riddleAnswer; if matches, set isSolved (is_solved in DB) to 1
	if answer != riddleAnswer.Answer {
		c.JSON(http.StatusOK, gin.H{
			"success": false,
		})
		return
	}
	updateRiddleAnswerFlag(id)
	c.JSON(http.StatusOK, gin.H{
		"success": true,
	})
}
func updateRiddleAnswerFlag(id string) {
	initializers.DB.Table("riddles").Where("id = ?", id).Update("is_solved", 1)
}
func retrieveRiddleAnswer(id string) (riddleAnswer models.Riddle) {
	initializers.DB.Table("riddles").Select("answer").Where("id = ?", id).Scan(&riddleAnswer)

	return riddleAnswer
}
