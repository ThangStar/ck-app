# Client-Side Only Fixes for Hydration Issues

This document explains the fixes applied to resolve hydration mismatches between server and client rendering.

## Problem

The application was experiencing hydration mismatches due to:
- `localStorage` access during server-side rendering
- Different initial states between server and client
- Redux store initialization with client-side data

## Solutions Applied

### 1. Client-Only Wrapper Component

Created `components/client-only.tsx` to ensure components only render on the client:

```tsx
"use client"

import { useEffect, useState } from "react"

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
```

### 2. Updated Layout to Use Client-Only Wrapper

Modified `app/layout.tsx` to wrap the entire app in `ClientOnly`:

```tsx
<ClientOnly
  fallback={
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-white font-medium">Đang tải...</p>
      </div>
    </div>
  }
>
  <ReduxProvider>{children}</ReduxProvider>
</ClientOnly>
```

### 3. Fixed Redux Store Initialization

Updated `lib/authSlice.ts` to handle server-side rendering properly:

```typescript
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
```

### 4. Updated AuthGuard Component

Modified `components/auth-guard.tsx` to prevent hydration issues:

```tsx
export default function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  // ... other state

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything until we're on the client
  if (!isClient) {
    return <LoadingSpinner />
  }

  // ... rest of component logic
}
```

### 5. Made Pages Client-Side Only

Added `"use client"` directive to pages that use client-side features:

- `app/page.tsx` - Main homepage
- `app/products/page.tsx` - Products page
- All authentication pages already had `"use client"`

### 6. Updated API Client

Ensured `lib/api.ts` only accesses `localStorage` on client side:

```typescript
constructor(baseURL = "http://localhost:5000/api") {
  this.baseURL = baseURL
  // Get token from localStorage if available (only on client side)
  if (typeof window !== "undefined") {
    this.token = localStorage.getItem("token")
  }
}
```

## Benefits of This Approach

1. **No Hydration Mismatches**: Server and client render the same initial content
2. **Better Performance**: No unnecessary re-renders due to hydration issues
3. **Consistent State**: Redux store initializes consistently
4. **Better UX**: Proper loading states while client-side code loads
5. **SEO Friendly**: Still maintains server-side rendering for static content

## Usage Pattern

For any component that needs client-side features:

```tsx
"use client"

import ClientOnly from "@/components/client-only"

export default function MyComponent() {
  return (
    <ClientOnly fallback={<LoadingSpinner />}>
      {/* Your client-side component content */}
    </ClientOnly>
  )
}
```

## Key Principles

1. **Always check `typeof window !== "undefined"`** before accessing browser APIs
2. **Use `ClientOnly` wrapper** for components with client-side dependencies
3. **Provide meaningful fallbacks** for loading states
4. **Initialize Redux state consistently** between server and client
5. **Use `useEffect`** to handle client-side initialization

## Testing

To verify the fixes work:

1. Open browser dev tools
2. Check for hydration warnings in console
3. Verify no "Text content does not match" errors
4. Test authentication flow
5. Test product loading
6. Verify localStorage access works properly

The application should now run without hydration mismatches while maintaining all functionality.
