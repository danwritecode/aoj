package models

type Riddle struct {
	Id         int    `gorm:"unique" json:"id"`
	Title      string `json:"title"`
	Riddle     string `json:"riddle"`
	Answer     string `json:"answer"`
	Effective  string `json:"effective"`
	Expiration string `json:"expiration"`
	Story      string `json:"story"`
	IsSolved   int    `json:"isSolved"`
}
