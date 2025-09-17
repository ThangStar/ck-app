class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL = "/api") {
    this.baseURL = baseURL
    // Get token from localStorage if available
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
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(email: string, password: string, name: string, phone: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name, phone }),
    })
  }

  async getProfile() {
    return this.request("/auth/profile")
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

  // Investment endpoints
  async getInvestments() {
    return this.request("/investments")
  }

  async purchaseInvestment(investmentId: string, amount: number) {
    return this.request("/investments/purchase", {
      method: "POST",
      body: JSON.stringify({ investmentId, amount }),
    })
  }
}

export const apiClient = new ApiClient()
export default apiClient
