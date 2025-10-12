import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
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
}

interface ProductState {
  products: Product[]
  currentProduct: Product | null
  isLoading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,
}

// Async thunks for API calls
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ adoption_duration, egg_type }: { adoption_duration?: number; egg_type?: string } = {}) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/products`
    const params = new URLSearchParams()
    
    if (adoption_duration !== undefined) params.append("adoption_duration", adoption_duration.toString())
    if (egg_type) params.append("egg_type", egg_type)
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Không thể tải danh sách sản phẩm")
    }

    const data = await response.json()
    return data.data.products
  },
)

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Không thể tải thông tin sản phẩm")
    }

    const data = await response.json()
    return data.data.products[0]
  },
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Không thể tải danh sách sản phẩm"
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Không thể tải thông tin sản phẩm"
      })
  },
})

export const { clearError, clearCurrentProduct } = productSlice.actions
export default productSlice.reducer
