class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL = "http://localhost:5000/api") {
    this.baseURL = baseURL
    // Get token from localStorage (client-side only)
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Auth endpoints
  async login(username: string, password: string) {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        user: {
          id: number
          username: string
          full_name: string
          created_at: string
        }
        token: string
      }
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
    
    // Extract data from the API response structure
    return {
      user: response.data.user,
      token: response.data.token,
      message: response.message
    }
  }

  async register(username: string, password: string, full_name: string) {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        user: {
          id: number
          username: string
          full_name: string
          created_at: string
        }
        token: string
      }
    }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password, full_name }),
    })
    
    // Extract data from the API response structure
    return {
      user: response.data.user,
      token: response.data.token,
      message: response.message
    }
  }

  async getProfile() {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        user: {
          id: number
          username: string
          full_name: string
          created_at: string
        }
      }
    }>("/auth/profile")
    
    // Extract user from the API response structure
    return {
      user: response.data.user
    }
  }

  // Product endpoints
  async getProducts(adoption_duration?: number, egg_type?: string) {
    let endpoint = "/products"
    const params = new URLSearchParams()
    
    if (adoption_duration !== undefined) params.append("adoption_duration", adoption_duration.toString())
    if (egg_type) params.append("egg_type", egg_type)
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`
    }
    
    const response = await this.request<{
      success: boolean
      data: {
        products: Array<{
          id: number
          name: string
          egg_type: string
          adoption_duration: number
          description: string
          total_income: number
          price: number
          animal_image: string
          created_at: string
          updated_at: string
        }>
      }
    }>(endpoint)
    
    return response.data.products
  }

  async getProductById(id: string) {
    const response = await this.request<{
      success: boolean
      data: {
        products: Array<{
          id: number
          name: string
          adoption_duration: number
          description: string
          total_income: number
          animal_image: string
          created_at: string
          updated_at: string
        }>
      }
    }>(`/products/${id}`)
    
    return response.data.products[0]
  }

  // Health check
  async healthCheck() {
    return this.request("/health")
  }

  // Check-in endpoints
  async dailyCheckIn() {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        checkin: {
          id: number
          checkin_date: string
          reward_amount: number
          reward_diamonds: number
        }
        wallet: {
          balance: number
          diamonds: number
        }
      }
    }>("/checkin/daily", {
      method: "POST",
    })
    
    return response.data
  }

  async getCheckInHistory() {
    const response = await this.request<{
      success: boolean
      data: {
        checkins: Array<{
          id: number
          checkin_date: string
          reward_amount: number
          reward_diamonds: number
        }>
        pagination: {
          current_page: number
          total_pages: number
          total_records: number
          limit: number
        }
      }
    }>("/checkin/history?page=1&limit=50")
    
    return response.data.checkins
  }

  async getTodayCheckIn() {
    const response = await this.request<{
      success: boolean
      data: {
        has_checked_in: boolean
        checkin_date: string
        reward?: {
          amount: number
          diamonds: number
        }
      }
    }>("/checkin/today")
    
    return response.data
  }

  async getCheckInStreak() {
    const response = await this.request<{
      success: boolean
      data: {
        streak_days: number
        total_checkins: number
      }
    }>("/checkin/streak")
    
    return response.data
  }

  // Transaction endpoints
  async getTransactions() {
    return this.request("/transactions")
  }

  async deposit(amount: number, bankInfo: any) {
    return this.request("/transactions/deposit", {
      method: "POST",
      body: JSON.stringify({ amount, bankInfo }),
    })
  }

  async withdraw(amount: number, bankInfo: any) {
    return this.request("/transactions/withdraw", {
      method: "POST",
      body: JSON.stringify({ amount, bankInfo }),
    })
  }

  // Purchase endpoints
  async buyProduct(productId: number) {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        user_product: {
          id: number
          product_name: string
          total_incubation_days: number
          incubation_days_remaining: number
          status: string
          purchased_at: string
        }
        wallet: {
          account_balance: number
          balance: number
        }
      }
    }>("/purchase/buy", {
      method: "POST",
      body: JSON.stringify({ product_id: productId }),
    })
    
    return response.data
  }

  async getPurchasedEggs(status?: string) {
    let endpoint = "/purchase/eggs"
    if (status) {
      endpoint += `?status=${status}`
    }
    
    const response = await this.request<{
      success: boolean
      data: {
        eggs: Array<{
          id: number
          product: {
            id: number
            name: string
            description: string
            animal_image: string
            total_income: number
          }
          status: string
          total_incubation_days: number
          incubation_days_remaining: number
          income_received: number
          purchased_at: string
          incubation_started_at: string | null
          completed_at: string | null
        }>
      }
    }>(endpoint)
    
    return response.data.eggs
  }

  async startIncubation(userProductId: number) {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        user_product: {
          id: number
          status: string
          incubation_started_at: string
          incubation_days_remaining: number
        }
      }
    }>("/purchase/start-incubation", {
      method: "POST",
      body: JSON.stringify({ user_product_id: userProductId }),
    })
    
    return response.data
  }

  // Incubation System
  async processIncubation() {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        results: Array<{
          egg_id: number
          product_name: string
          days_remaining?: number
          income?: number
          status: string
        }>
      }
    }>("/incubation/process", {
      method: "POST",
    })
    
    return response.data
  }

  async getIncubationStatus() {
    const response = await this.request<{
      success: boolean
      data: {
        incubating: Array<{
          id: number
          product: {
            id: number
            name: string
            animal_image: string
            total_income: number
          }
          days_remaining: number
          incubation_started_at: string
          progress_percent: number
        }>
        ready_to_claim: Array<{
          id: number
          product: {
            id: number
            name: string
            animal_image: string
            total_income: number
          }
          income_available: number
          completed_at: string
        }>
        completed: Array<{
          id: number
          product: {
            id: number
            name: string
            animal_image: string
            total_income: number
          }
          income_received: number
          completed_at: string
        }>
      }
    }>("/incubation/status")
    
    return response.data
  }

  async reduceIncubationTime(userProductId: number, helperUsername: string) {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        egg_id: number
        helper_username: string
        days_remaining: number
        is_completed: boolean
      }
    }>("/incubation/reduce-time", {
      method: "POST",
      body: JSON.stringify({ 
        user_product_id: userProductId, 
        helper_username: helperUsername 
      }),
    })
    
    return response.data
  }

  async claimIncome(userProductId: number) {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        egg_id: number
        product_name: string
        income_received: number
        wallet_balance: number
      }
    }>("/incubation/claim", {
      method: "POST",
      body: JSON.stringify({ user_product_id: userProductId }),
    })
    
    return response.data
  }

  // Friend System
  async inviteFriend(friendUsername: string) {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        friend: {
          id: number
          friend_username: string
          status: string
          invited_at: string
        }
      }
    }>("/friend/invite", {
      method: "POST",
      body: JSON.stringify({ friend_username: friendUsername }),
    })
    
    return response.data
  }

  async acceptFriendInvitation(friendId: number) {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        friend: {
          id: number
          friend_username: string
          status: string
          accepted_at: string
        }
      }
    }>("/friend/accept", {
      method: "POST",
      body: JSON.stringify({ friend_id: friendId }),
    })
    
    return response.data
  }

  async declineFriendInvitation(friendId: number) {
    const response = await this.request<{
      success: boolean
      message: string
    }>("/friend/decline", {
      method: "POST",
      body: JSON.stringify({ friend_id: friendId }),
    })
    
    return response
  }

  async getFriendList() {
    const response = await this.request<{
      success: boolean
      data: {
        friends: Array<{
          id: number
          friend_username: string
          accepted_at: string
        }>
      }
    }>("/friend/list")
    
    return response.data.friends
  }

  async getPendingInvitations() {
    const response = await this.request<{
      success: boolean
      data: {
        invitations: Array<{
          id: number
          friend_username: string
          invited_at: string
        }>
      }
    }>("/friend/pending")
    
    return response.data.invitations
  }

  // Notifications
  async getNotifications(page = 1, limit = 20, type?: string) {
    let endpoint = `/notification?page=${page}&limit=${limit}`
    if (type) endpoint += `&type=${type}`
    
    const response = await this.request<{
      success: boolean
      data: {
        notifications: Array<{
          id: number
          title: string
          message: string
          type: string
          is_read: boolean
          data: any
          created_at: string
        }>
        pagination: {
          current_page: number
          total_pages: number
          total_records: number
          limit: number
        }
      }
    }>(endpoint)
    
    return response.data
  }

  async markNotificationAsRead(notificationId: number) {
    const response = await this.request<{
      success: boolean
      message: string
    }>("/notification/mark-read", {
      method: "POST",
      body: JSON.stringify({ notification_id: notificationId }),
    })
    
    return response
  }

  async markAllNotificationsAsRead() {
    const response = await this.request<{
      success: boolean
      message: string
    }>("/notification/mark-all-read", {
      method: "POST",
    })
    
    return response
  }

  async getUnreadNotificationCount() {
    const response = await this.request<{
      success: boolean
      data: {
        unread_count: number
      }
    }>("/notification/unread-count")
    
    return response.data.unread_count
  }

  async deleteNotification(notificationId: number) {
    const response = await this.request<{
      success: boolean
      message: string
    }>(`/notification/${notificationId}`, {
      method: "DELETE",
    })
    
    return response
  }
}

export const apiClient = new ApiClient()
export default apiClient
