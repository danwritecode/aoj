package main

import (
	"aoj/controllers"
	"aoj/initializers"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()

	r.GET("/riddles", controllers.GetRiddles)
	r.GET("/riddles/:id", controllers.GetRiddlesById)
	r.PUT("/riddles/answers/:id", controllers.SolveRiddle)

	r.Run()
}
