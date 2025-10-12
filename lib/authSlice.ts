import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string
  username: string
  full_name: string
  balance?: number
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

// Get initial state from localStorage only on client side
const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
    }
  }

  const token = localStorage.getItem("token")
  return {
    user: null,
    token,
    isLoading: false,
    error: null,
    isAuthenticated: !!token,
  }
}

const initialState: AuthState = getInitialState()

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Đăng nhập thất bại")
    }

    const data = await response.json()
    
    // Extract user and token from the API response structure
    return {
      user: data.data.user,
      token: data.data.token,
      message: data.message
    }
  },
)

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, password, full_name }: { username: string; password: string; full_name: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, full_name }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Đăng ký thất bại")
    }

    const data = await response.json()
    
    // Extract user and token from the API response structure
    return {
      user: data.data.user,
      token: data.data.token,
      message: data.message
    }
  },
)

export const getUserProfile = createAsyncThunk(
  "auth/profile",
  async (_, { getState }) => {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token

    if (!token) {
      throw new Error("No authentication token")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Không thể lấy thông tin người dùng")
    }

    const data = await response.json()
    
    // Extract user from the API response structure
    return {
      user: data.data.user || data.user
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem("token")
    },
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem("token", action.payload.token)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Đăng nhập thất bại"
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Đăng ký thất bại"
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Không thể lấy thông tin người dùng"
        // If profile fetch fails, logout user
        state.user = null
        state.token = null
        state.isAuthenticated = false
        localStorage.removeItem("token")
      })
  },
})

export const { logout, clearError, setCredentials } = authSlice.actions
export default authSlice.reducer
