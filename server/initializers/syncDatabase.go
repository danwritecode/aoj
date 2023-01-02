package initializers

import (
	"aoj/models"
)

func SyncDatabase() {
	DB.AutoMigrate(&models.Riddle{})
}
