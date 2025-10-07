import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import productReducer from "./productSlice"
import checkinReducer from "./checkinSlice"
import purchaseReducer from "./purchaseSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    checkin: checkinReducer,
    purchase: purchaseReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
