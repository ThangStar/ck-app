// Example usage of the API client

import { apiClient } from "./api"

// Example: Login user
export async function loginExample() {
  try {
    const response = await apiClient.login("123", "password123")
    console.log("Login successful:", response)
    console.log("User:", response.user)
    console.log("Token:", response.token)
    return response
  } catch (error) {
    console.error("Login failed:", error)
    throw error
  }
}

// Example: Register user
export async function registerExample() {
  try {
    const response = await apiClient.register("jane_doe", "password123", "Jane Doe")
    console.log("Registration successful:", response)
    return response
  } catch (error) {
    console.error("Registration failed:", error)
    throw error
  }
}

// Example: Get user profile
export async function getProfileExample() {
  try {
    const response = await apiClient.getProfile()
    console.log("Profile:", response)
    return response
  } catch (error) {
    console.error("Get profile failed:", error)
    throw error
  }
}

// Example: Get all products
export async function getAllProductsExample() {
  try {
    const response = await apiClient.getProducts()
    console.log("All products:", response)
    return response
  } catch (error) {
    console.error("Get products failed:", error)
    throw error
  }
}

// Example: Get products by type
export async function getProductsByTypeExample() {
  try {
    const response = await apiClient.getProducts("cai")
    console.log("Products by type 'cai':", response)
    return response
  } catch (error) {
    console.error("Get products by type failed:", error)
    throw error
  }
}

// Example: Get products by VIP requirement
export async function getProductsByVipExample() {
  try {
    const response = await apiClient.getProducts(undefined, 0)
    console.log("Products not requiring VIP:", response)
    return response
  } catch (error) {
    console.error("Get products by VIP failed:", error)
    throw error
  }
}

// Example: Get product by ID
export async function getProductByIdExample() {
  try {
    const response = await apiClient.getProductById("1")
    console.log("Product by ID:", response)
    return response
  } catch (error) {
    console.error("Get product by ID failed:", error)
    throw error
  }
}

// Example: Health check
export async function healthCheckExample() {
  try {
    const response = await apiClient.healthCheck()
    console.log("API health:", response)
    return response
  } catch (error) {
    console.error("Health check failed:", error)
    throw error
  }
}

// Example: Daily check-in
export async function dailyCheckInExample() {
  try {
    const response = await apiClient.dailyCheckIn()
    console.log("Check-in successful:", response)
    return response
  } catch (error) {
    console.error("Check-in failed:", error)
    throw error
  }
}

// Example: Get check-in history
export async function getCheckInHistoryExample() {
  try {
    const response = await apiClient.getCheckInHistory()
    console.log("Check-in history:", response)
    return response
  } catch (error) {
    console.error("Get check-in history failed:", error)
    throw error
  }
}

// Example: Get today's check-in status
export async function getTodayCheckInExample() {
  try {
    const response = await apiClient.getTodayCheckIn()
    console.log("Today's check-in status:", response)
    return response
  } catch (error) {
    console.error("Get today's check-in failed:", error)
    throw error
  }
}

// Example: Get check-in streak
export async function getCheckInStreakExample() {
  try {
    const response = await apiClient.getCheckInStreak()
    console.log("Check-in streak:", response)
    return response
  } catch (error) {
    console.error("Get check-in streak failed:", error)
    throw error
  }
}
