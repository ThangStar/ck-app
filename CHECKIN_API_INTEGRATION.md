# Check-in API Integration

This document explains the integration of the daily check-in functionality with the external API.

## API Endpoints

### 1. Daily Check-in
- **Endpoint**: `POST /api/checkin/daily`
- **Authentication**: Bearer token required
- **Response**: Check-in record and wallet update

### 2. Check-in History
- **Endpoint**: `GET /api/checkin/history?page=1&limit=10`
- **Authentication**: Bearer token required
- **Response**: Paginated list of check-in records

### 3. Today's Check-in Status
- **Endpoint**: `GET /api/checkin/today`
- **Authentication**: Bearer token required
- **Response**: Today's check-in status and reward

### 4. Check-in Streak
- **Endpoint**: `GET /api/checkin/streak`
- **Authentication**: Bearer token required
- **Response**: Current streak and total check-ins

## Data Models

### CheckInRecord
```typescript
interface CheckInRecord {
  id: number
  checkin_date: string
  reward_amount: number
  reward_diamonds: number
}
```

### CheckInStreak
```typescript
interface CheckInStreak {
  streak_days: number
  total_checkins: number
}
```

### TodayCheckIn
```typescript
interface TodayCheckIn {
  has_checked_in: boolean
  checkin_date: string
  reward?: {
    amount: number
    diamonds: number
  }
}
```

## Redux Implementation

### Check-in Slice (`lib/checkinSlice.ts`)

**Actions:**
- `dailyCheckIn` - Perform daily check-in
- `getCheckInHistory` - Fetch check-in history
- `getTodayCheckIn` - Get today's check-in status
- `getCheckInStreak` - Get streak information

**State:**
```typescript
interface CheckInState {
  todayStatus: TodayCheckIn | null
  history: CheckInRecord[]
  streak: CheckInStreak | null
  isLoading: boolean
  error: string | null
}
```

### API Client (`lib/api.ts`)

**Methods:**
- `dailyCheckIn()` - Call daily check-in API
- `getCheckInHistory()` - Fetch check-in history
- `getTodayCheckIn()` - Get today's status
- `getCheckInStreak()` - Get streak data

## UI Implementation

### Daily Check-in Page (`app/daily-checkin/page.tsx`)

**Features:**
- Real-time check-in status display
- Streak counter with visual indicators
- Weekly calendar showing check-in history
- Reward display for completed check-ins
- Error handling and loading states

**Key Components:**
- Streak display with current and total counts
- Weekly calendar with check-in indicators
- Check-in button with loading states
- Reward information display
- Bonus rewards tracking

## API Response Handling

### Daily Check-in Response
```json
{
  "success": true,
  "message": "Điểm danh thành công!",
  "data": {
    "checkin": {
      "id": 1,
      "checkin_date": "2024-01-01",
      "reward_amount": 1000,
      "reward_diamonds": 0
    },
    "wallet": {
      "balance": 1000,
      "diamonds": 0
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Bạn đã điểm danh hôm nay rồi!"
}
```

### Today's Status Response
```json
{
  "success": true,
  "data": {
    "has_checked_in": true,
    "checkin_date": "2024-01-01",
    "reward": {
      "amount": 1000,
      "diamonds": 0
    }
  }
}
```

### Streak Response
```json
{
  "success": true,
  "data": {
    "streak_days": 7,
    "total_checkins": 15
  }
}
```

## Hydration Fix

The daily check-in page is wrapped in `ClientOnly` component to prevent hydration mismatches:

```tsx
<ClientOnly
  fallback={<LoadingSpinner />}
>
  {/* Check-in content */}
</ClientOnly>
```

## Usage

### 1. Check-in Flow
1. User opens daily check-in page
2. App loads today's status and streak data
3. User clicks check-in button
4. API call is made to external service
5. Success response updates UI and Redux state
6. User sees confirmation and updated rewards

### 2. Data Loading
- On page load: `getTodayCheckIn()`, `getCheckInStreak()`, `getCheckInHistory()`
- After check-in: Refresh today's status and streak
- Error handling: Display error messages with retry options

### 3. State Management
- All check-in data stored in Redux
- Real-time UI updates based on state changes
- Persistent data across page navigation
- Loading states for better UX

## Error Handling

- Network errors are caught and displayed
- API error responses are properly handled
- User-friendly error messages in Vietnamese
- Retry mechanisms for failed requests
- Clear error dismissal options

## Benefits

1. **Real-time Updates**: Immediate UI updates after check-in
2. **Data Persistence**: Check-in history maintained in Redux
3. **Error Handling**: Comprehensive error management
4. **Loading States**: Better user experience during API calls
5. **Type Safety**: Full TypeScript support
6. **Hydration Safe**: No server-side rendering issues

The check-in functionality is now fully integrated with the external API and provides a smooth user experience with proper error handling and real-time updates.
