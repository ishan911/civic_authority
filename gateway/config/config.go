package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBURL     string
	JWTSecret string
	Port      string
}

func Load() Config {
	// Load .env from project root (one level up from gateway/)
	if err := godotenv.Load("../.env"); err != nil {
		log.Println("no .env file found, reading from environment")
	}

	return Config{
		DBURL:     mustGet("DB_URL"),
		JWTSecret: mustGet("JWT_SECRET"),
		Port:      getOrDefault("PORT", "8080"),
	}
}

func mustGet(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("required env var %s is not set", key)
	}
	return v
}

func getOrDefault(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
