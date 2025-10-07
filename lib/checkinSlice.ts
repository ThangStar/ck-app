import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface CheckInRecord {
  id: number
  checkin_date: string
  reward_amount: number
  reward_diamonds: number
}

export interface CheckInStreak {
  streak_days: number
  total_checkins: number
}

export interface TodayCheckIn {
  has_checked_in: boolean
  checkin_date: string
  reward?: {
    amount: number
    diamonds: number
  }
}

export interface CheckInResponse {
  checkin: CheckInRecord
  wallet: {
    balance: number
    diamonds: number
  }
}

interface CheckInState {
  todayStatus: TodayCheckIn | null
  history: CheckInRecord[]
  streak: CheckInStreak | null
  isLoading: boolean
  error: string | null
}

const initialState: CheckInState = {
  todayStatus: null,
  history: [],
  streak: null,
  isLoading: false,
  error: null,
}

// Async thunks for API calls
export const dailyCheckIn = createAsyncThunk(
  "checkin/daily",
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string } }
    const token = state.auth.token

    if (!token) {
      throw new Error("No authentication token")
    }

    const response = await fetch("http://localhost:5000/api/checkin/daily", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Điểm danh thất bại")
    }

    return data.data
  },
)

export const getCheckInHistory = createAsyncThunk(
  "checkin/history",
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string } }
    const token = state.auth.token

    if (!token) {
      throw new Error("No authentication token")
    }

    const response = await fetch("http://localhost:5000/api/checkin/history?page=1&limit=50", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Không thể tải lịch sử điểm danh")
    }

    return data.data.checkins
  },
)

export const getTodayCheckIn = createAsyncThunk(
  "checkin/today",
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string } }
    const token = state.auth.token

    if (!token) {
      throw new Error("No authentication token")
    }

    const response = await fetch("http://localhost:5000/api/checkin/today", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Không thể tải trạng thái điểm danh hôm nay")
    }

    return data.data
  },
)

export const getCheckInStreak = createAsyncThunk(
  "checkin/streak",
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string } }
    const token = state.auth.token

    if (!token) {
      throw new Error("No authentication token")
    }

    const response = await fetch("http://localhost:5000/api/checkin/streak", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Không thể tải thông tin streak")
    }

    return data.data
  },
)

const checkinSlice = createSlice({
  name: "checkin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCheckInData: (state) => {
      state.todayStatus = null
      state.history = []
      state.streak = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Daily check-in
      .addCase(dailyCheckIn.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(dailyCheckIn.fulfilled, (state, action) => {
        state.isLoading = false
        // Update today's status after successful check-in
        state.todayStatus = {
          has_checked_in: true,
          checkin_date: action.payload.checkin.checkin_date,
          reward: {
            amount: action.payload.checkin.reward_amount,
            diamonds: action.payload.checkin.reward_diamonds,
          },
        }
      })
      .addCase(dailyCheckIn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Điểm danh thất bại"
      })
      // Get check-in history
      .addCase(getCheckInHistory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getCheckInHistory.fulfilled, (state, action) => {
        state.isLoading = false
        state.history = action.payload
      })
      .addCase(getCheckInHistory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Không thể tải lịch sử điểm danh"
      })
      // Get today's check-in status
      .addCase(getTodayCheckIn.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getTodayCheckIn.fulfilled, (state, action) => {
        state.isLoading = false
        state.todayStatus = action.payload
      })
      .addCase(getTodayCheckIn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Không thể tải trạng thái điểm danh hôm nay"
      })
      // Get check-in streak
      .addCase(getCheckInStreak.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getCheckInStreak.fulfilled, (state, action) => {
        state.isLoading = false
        state.streak = action.payload
      })
      .addCase(getCheckInStreak.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Không thể tải thông tin streak"
      })
  },
})

export const { clearError, clearCheckInData } = checkinSlice.actions
export default checkinSlice.reducer
