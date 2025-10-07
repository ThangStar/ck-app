# API Integration Guide

This document explains how the application integrates with the external API for authentication and product management.

## External API Configuration

The application is configured to use an external API running on `http://localhost:5000/api`.

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/profile` - Get user profile (requires authentication)

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products?type=cai` - Get products by type
- `GET /api/products?vip_required=0` - Get products by VIP requirement

#### Health Check
- `GET /api/health` - Check API status

## Implementation Details

### 1. API Client (`lib/api.ts`)

The `ApiClient` class handles all external API communication:

```typescript
import { apiClient } from "@/lib/api"

// Login
const loginResponse = await apiClient.login("username", "password")

// Register
const registerResponse = await apiClient.register("username", "password", "Full Name")

// Get products
const products = await apiClient.getProducts("cai", 0)

// Get product by ID
const product = await apiClient.getProductById("1")
```

### 2. Redux State Management

#### Authentication (`lib/authSlice.ts`)
- `loginUser` - Login action
- `registerUser` - Register action  
- `getUserProfile` - Get user profile action
- `logout` - Logout action

#### Products (`lib/productSlice.ts`)
- `fetchProducts` - Fetch products with optional filters
- `fetchProductById` - Fetch single product
- `clearError` - Clear error state
- `clearCurrentProduct` - Clear current product

### 3. API Proxy Routes

The application includes Next.js API routes that proxy requests to the external API:

- `app/api/auth/login/route.ts` - Proxies login requests
- `app/api/auth/register/route.ts` - Proxies register requests
- `app/api/products/route.ts` - Proxies product list requests
- `app/api/products/[id]/route.ts` - Proxies single product requests

### 4. User Interface Updates

#### Login Page (`app/login/page.tsx`)
- Updated to use `username` instead of `email`
- Integrates with Redux authentication state
- Handles external API responses

#### Register Page (`app/register/page.tsx`)
- Updated to use `username` and `full_name` fields
- Removed email and phone fields to match external API
- Integrates with Redux authentication state

#### Products Page (`app/products/page.tsx`)
- Demonstrates product fetching with filters
- Shows how to use the ProductsList component

### 5. Data Models

#### User Model
```typescript
interface User {
  id: string
  username: string
  full_name: string
  balance?: number
}
```

#### Product Model
```typescript
interface Product {
  id: string
  name: string
  type: string
  price: number
  vip_required: number
  description?: string
  image_url?: string
  created_at: string
  updated_at: string
}
```

## Usage Examples

### Using Redux Actions

```typescript
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { loginUser, fetchProducts } from "@/lib/authSlice"
import { fetchProducts } from "@/lib/productSlice"

function MyComponent() {
  const dispatch = useAppDispatch()
  const { user, isLoading } = useAppSelector(state => state.auth)
  const { products } = useAppSelector(state => state.products)

  const handleLogin = async () => {
    await dispatch(loginUser({ username: "john", password: "123456" }))
  }

  const handleFetchProducts = async () => {
    await dispatch(fetchProducts({ type: "cai", vip_required: 0 }))
  }
}
```

### Using API Client Directly

```typescript
import { apiClient } from "@/lib/api"

// Direct API calls
const products = await apiClient.getProducts("cai", 0)
const product = await apiClient.getProductById("1")
const profile = await apiClient.getProfile()
```

### Using Components

```tsx
import ProductsList from "@/components/products-list"

// In your component
<ProductsList type="cai" vip_required={0} />
```

## Error Handling

The implementation includes comprehensive error handling:

1. **API Level**: Network errors and HTTP status codes
2. **Redux Level**: Action rejection handling
3. **Component Level**: Loading states and error display
4. **User Level**: Form validation and user feedback

## Authentication Flow

1. User submits login/register form
2. Form data is sent to Next.js API route
3. API route proxies request to external API
4. External API responds with user data and JWT token
5. Token is stored in HTTP-only cookie and localStorage
6. Redux state is updated with user information
7. User is redirected to home page

## Product Fetching Flow

1. Component dispatches `fetchProducts` action
2. Redux thunk makes API call to external API
3. Products data is stored in Redux state
4. Component re-renders with new data
5. Loading and error states are handled appropriately

## Development Notes

- Make sure the external API is running on `http://localhost:5000`
- The application uses CORS for cross-origin requests
- JWT tokens are stored in both HTTP-only cookies and localStorage
- All API calls include proper error handling and loading states
- The implementation is fully typed with TypeScript
