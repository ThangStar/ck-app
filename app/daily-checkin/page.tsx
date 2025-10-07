"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calendar, CheckCircle, Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { 
  dailyCheckIn, 
  getTodayCheckIn, 
  getCheckInStreak, 
  getCheckInHistory,
  clearError 
} from "@/lib/checkinSlice"
import ClientOnly from "@/components/client-only"

export default function DailyCheckin() {
  const dispatch = useAppDispatch()
  const { 
    todayStatus, 
    streak, 
    history, 
    isLoading, 
    error 
  } = useAppSelector((state) => state.checkin)

  useEffect(() => {
    // Load today's status and streak on component mount
    dispatch(getTodayCheckIn())
    dispatch(getCheckInStreak())
    dispatch(getCheckInHistory())
  }, [dispatch])

  const handleCheckin = async () => {
    try {
      await dispatch(dailyCheckIn()).unwrap()
      // Refresh data after successful check-in
      dispatch(getTodayCheckIn())
      dispatch(getCheckInStreak())
    } catch (error) {
      console.error("Check-in failed:", error)
    }
  }

  // Calculate checked days for this week
  const getCheckedDaysThisWeek = () => {
    if (!history || history.length === 0) return []
    
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1) // Monday
    
    const checkedDays = []
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(startOfWeek)
      checkDate.setDate(startOfWeek.getDate() + i)
      
      const hasCheckedIn = history.some(record => {
        const recordDate = new Date(record.checkin_date)
        return recordDate.toDateString() === checkDate.toDateString()
      })
      
      if (hasCheckedIn) {
        checkedDays.push(i + 1)
      }
    }
    
    return checkedDays
  }

  const checkedDays = getCheckedDaysThisWeek()
  const todayChecked = todayStatus?.has_checked_in || false

  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-medium">Đang tải...</p>
          </div>
        </div>
      }
    >
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400">
        <StatusBar />

        <div className="px-4 sm:px-6 lg:px-8 pb-24 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pt-4">
          <Button variant="ghost" size="sm" className="text-white p-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl sm:text-2xl font-bold">Điểm Danh Hàng Ngày</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => dispatch(clearError())}
              className="ml-2 text-red-600"
            >
              ✕
            </Button>
          </div>
        )}

        {/* Current Streak */}
        <Card className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-emerald-600 mb-2">Chuỗi điểm danh</h2>
            <p className="text-3xl font-bold text-orange-500">
              {streak?.streak_days || 0} ngày
            </p>
            <p className="text-gray-600 mt-2">Điểm danh liên tục để nhận thưởng lớn!</p>
            {streak && (
              <div className="mt-4 grid grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Tổng điểm danh</p>
                  <p className="font-bold text-blue-600">{streak.total_checkins} lần</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Weekly Calendar */}
        <Card className="bg-white rounded-2xl p-4 sm:p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">Tuần này</h3>
          <div className="grid grid-cols-7 gap-2">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => (
              <div key={day} className="text-center">
                <p className="text-sm text-gray-600 mb-2">{day}</p>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    checkedDays.includes(index + 1)
                      ? "bg-emerald-600 text-white"
                      : index + 1 === 4
                        ? "bg-orange-100 text-orange-600 border-2 border-orange-600"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {checkedDays.includes(index + 1) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <p className="text-xs mt-1">{index + 1 <= 3 ? "10k" : index + 1 === 4 ? "15k" : "20k"}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Reward */}
        <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl p-6 mb-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Phần thưởng hôm nay</h3>
            <p className="text-3xl font-bold mb-4">15,000đ</p>
            {todayChecked && todayStatus?.reward && (
              <div className="text-sm mb-4 opacity-90">
                <p>Đã điểm danh hôm nay!</p>
                <p>Nhận được: {todayStatus.reward.amount.toLocaleString('vi-VN')}đ</p>
                {todayStatus.reward.diamonds > 0 && (
                  <p>Kim cương: {todayStatus.reward.diamonds}</p>
                )}
              </div>
            )}
            <Button
              onClick={handleCheckin}
              disabled={todayChecked || isLoading}
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-3 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang xử lý...
                </>
              ) : todayChecked ? (
                "Đã điểm danh"
              ) : (
                "Điểm danh ngay"
              )}
            </Button>
          </div>
        </Card>

        {/* Bonus Rewards */}
        <Card className="bg-white rounded-2xl p-4 sm:p-6">
          <h3 className="font-bold text-lg mb-4">Phần thưởng đặc biệt</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Điểm danh 7 ngày liên tục</p>
                <p className="text-sm text-gray-600">Nhận 100,000đ</p>
              </div>
              <span className={`font-bold ${
                (streak?.streak_days || 0) >= 7 ? 'text-emerald-600' : 'text-gray-400'
              }`}>
                {Math.min(streak?.streak_days || 0, 7)}/7
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Điểm danh 30 ngày trong tháng</p>
                <p className="text-sm text-gray-600">Nhận 500,000đ</p>
              </div>
              <span className={`font-bold ${
                (streak?.total_checkins || 0) >= 30 ? 'text-orange-600' : 'text-gray-400'
              }`}>
                {Math.min(streak?.total_checkins || 0, 30)}/30
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Chuỗi điểm danh hiện tại</p>
                <p className="text-sm text-gray-600">Đang duy trì</p>
              </div>
              <span className="text-blue-600 font-bold">
                {streak?.streak_days || 0} ngày
              </span>
            </div>
          </div>
        </Card>
        </div>

        <BottomNavigation />
      </div>
    </ClientOnly>
  )
}
