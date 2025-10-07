import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { apiClient } from "./api"

export interface PurchasedEgg {
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
}

interface PurchaseState {
  eggs: PurchasedEgg[]
  isLoading: boolean
  error: string | null
  purchaseSuccess: boolean
}

const initialState: PurchaseState = {
  eggs: [],
  isLoading: false,
  error: null,
  purchaseSuccess: false,
}

// Async thunks for API calls
export const buyProduct = createAsyncThunk(
  "purchase/buyProduct",
  async (productId: number) => {
    return await apiClient.buyProduct(productId)
  },
)

export const fetchPurchasedEggs = createAsyncThunk(
  "purchase/fetchPurchasedEggs",
  async (status?: string) => {
    return await apiClient.getPurchasedEggs(status)
  },
)

export const startIncubation = createAsyncThunk(
  "purchase/startIncubation",
  async (userProductId: number) => {
    return await apiClient.startIncubation(userProductId)
  },
)

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearPurchaseSuccess: (state) => {
      state.purchaseSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buyProduct.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.purchaseSuccess = false
      })
      .addCase(buyProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.purchaseSuccess = true
      })
      .addCase(buyProduct.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Không thể mua sản phẩm"
        state.purchaseSuccess = false
      })
      .addCase(fetchPurchasedEggs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPurchasedEggs.fulfilled, (state, action) => {
        state.isLoading = false
        state.eggs = action.payload
      })
      .addCase(fetchPurchasedEggs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Không thể tải danh sách trứng"
      })
      .addCase(startIncubation.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(startIncubation.fulfilled, (state, action) => {
        state.isLoading = false
        // Update the egg status in the list
        const egg = state.eggs.find(egg => egg.id === action.payload.user_product.id)
        if (egg) {
          egg.status = action.payload.user_product.status
          egg.incubation_started_at = action.payload.user_product.incubation_started_at
          egg.incubation_days_remaining = action.payload.user_product.incubation_days_remaining
        }
      })
      .addCase(startIncubation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Không thể bắt đầu ấp trứng"
      })
  },
})

export const { clearError, clearPurchaseSuccess } = purchaseSlice.actions
export default purchaseSlice.reducer
