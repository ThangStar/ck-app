# API Response Structure Fix

This document explains the fixes applied to handle the new API response structure from the external authentication API.

## Problem

The external API returns a different response structure than what our Redux slice was expecting:

**API Response Structure:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "123",
      "full_name": "VĂN",
      "created_at": "2025-09-27T10:56:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Expected Structure (before fix):**
```json
{
  "user": { ... },
  "token": "...",
  "message": "..."
}
```

## Solutions Applied

### 1. Updated Redux Auth Slice (`lib/authSlice.ts`)

**Login Thunk:**
```typescript
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    // ... API call ...
    
    const data = await response.json()
    
    // Extract user and token from the API response structure
    return {
      user: data.data.user,
      token: data.data.token,
      message: data.message
    }
  },
)
```

**Register Thunk:**
```typescript
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, password, full_name }: { username: string; password: string; full_name: string }) => {
    // ... API call ...
    
    const data = await response.json()
    
    // Extract user and token from the API response structure
    return {
      user: data.data.user,
      token: data.data.token,
      message: data.message
    }
  },
)
```

**Get Profile Thunk:**
```typescript
export const getUserProfile = createAsyncThunk(
  "auth/profile",
  async (_, { getState }) => {
    // ... API call ...
    
    const data = await response.json()
    
    // Extract user from the API response structure
    return {
      user: data.data.user || data.user
    }
  },
)
```

### 2. Updated API Client (`lib/api.ts`)

Added proper TypeScript typing and data extraction:

```typescript
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
```

### 3. Updated API Proxy Routes

**Login Route (`app/api/auth/login/route.ts`):**
```typescript
// Set cookie for authentication using the token from data.data.token
const nextResponse = NextResponse.json(data)
nextResponse.cookies.set("token", data.data.token, {
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
})
```

**Register Route (`app/api/auth/register/route.ts`):**
```typescript
// Set cookie for authentication using the token from data.data.token
const nextResponse = NextResponse.json(data)
nextResponse.cookies.set("token", data.data.token, {
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
})
```

## Data Flow

### Login Process:
1. **User submits login form** → `username`, `password`
2. **Redux thunk calls API** → `POST /api/auth/login`
3. **API proxy forwards request** → `POST http://localhost:5000/api/auth/login`
4. **External API responds** → `{ success: true, message: "...", data: { user: {...}, token: "..." } }`
5. **Redux thunk extracts data** → `{ user: data.data.user, token: data.data.token, message: data.message }`
6. **Redux state updated** → User authenticated, token stored
7. **Cookie set** → `data.data.token` stored in HTTP-only cookie
8. **User redirected** → `/home` page

### Token Storage:
- **HTTP-only Cookie**: `data.data.token` (for server-side authentication)
- **localStorage**: `data.data.token` (for client-side authentication)
- **Redux State**: `data.data.token` (for application state)

## TypeScript Types

### API Response Types:
```typescript
interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

interface User {
  id: number
  username: string
  full_name: string
  created_at: string
}

interface LoginResponse {
  user: User
  token: string
}

interface ApiLoginResponse extends ApiResponse<{
  user: User
  token: string
}> {}
```

## Testing

To test the login with the new API structure:

1. **Start the external API** on `http://localhost:5000`
2. **Start the Next.js app** on `http://localhost:3000`
3. **Navigate to login page** → `/login`
4. **Enter credentials**:
   - Username: `123`
   - Password: `password123`
5. **Submit form** → Should redirect to `/home`
6. **Check Redux DevTools** → Should see user data and token in state
7. **Check Network tab** → Should see successful API calls

## Benefits

1. **Proper Data Extraction**: Correctly extracts user and token from nested API response
2. **Type Safety**: Full TypeScript support with proper interfaces
3. **Consistent State**: Redux state matches expected structure
4. **Cookie Management**: Proper token storage in HTTP-only cookies
5. **Error Handling**: Maintains existing error handling while supporting new structure

The authentication system now properly handles the external API's response structure and should work correctly with the provided API format.
