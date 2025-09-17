"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Target, Gift } from "lucide-react"
import { useRouter } from "next/navigation"

export function Homepage() {
  const router = useRouter()

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-24 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">SAPUTO RANCH</h1>
      </div>

      {/* Event Banner */}
      <Card className="bg-white rounded-2xl p-4 sm:p-6 mb-6">
        <img
          src="/happy-day-xiv-event-banner-with-group-of-people-in.jpg"
          alt="Happy Day XIV Event"
          className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg mb-4"
        />
        <div className="text-center">
          <h2 className="font-bold text-lg sm:text-xl text-emerald-600 mb-2">HAPPY DAY XIV</h2>
          <p className="text-sm sm:text-base text-gray-600">Ngày hội khách hàng thân thiết</p>
        </div>
      </Card>

      {/* Feature Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6">
        <Card
          className="bg-white p-3 sm:p-4 lg:p-6 text-center rounded-2xl cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/reward-center")}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-orange-100 rounded-full mx-auto mb-2 flex items-center justify-center">
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-orange-500" />
          </div>
          <h3 className="font-bold text-xs sm:text-sm lg:text-base mb-1">Trung tâm</h3>
          <p className="text-xs sm:text-xs lg:text-sm text-gray-600">Kim cương đổi quà tặng!</p>
        </Card>

        <Card
          className="bg-white p-3 sm:p-4 lg:p-6 text-center rounded-2xl cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/daily-checkin")}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-red-100 rounded-full mx-auto mb-2 flex items-center justify-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-red-500" />
          </div>
          <h3 className="font-bold text-xs sm:text-sm lg:text-base mb-1">Điểm danh</h3>
          <p className="text-xs sm:text-xs lg:text-sm text-gray-600">Điểm danh nhận tiền mặt!</p>
        </Card>

        <Card
          className="bg-white p-3 sm:p-4 lg:p-6 text-center rounded-2xl cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/missions")}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-500" />
          </div>
          <h3 className="font-bold text-xs sm:text-sm lg:text-base mb-1">Nhiệm vụ</h3>
          <p className="text-xs sm:text-xs lg:text-sm text-gray-600">Làm nhiệm vụ nhận thưởng!</p>
        </Card>
      </div>

      {/* Customer Service */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card
          className="bg-emerald-600 text-white p-4 sm:p-6 rounded-2xl col-span-1 cursor-pointer hover:bg-emerald-700 transition-colors"
          onClick={() => router.push("/customer-service")}
        >
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">CS</span>
              </div>
            </div>
            <h3 className="font-bold text-sm sm:text-base">TRUNG TÂM CSKH</h3>
          </div>
        </Card>

        <div className="col-span-1 sm:col-span-2 space-y-2 sm:space-y-3">
          <Card
            className="bg-white p-3 sm:p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push("/invite-friends")}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 text-sm sm:text-base">👥</span>
            </div>
            <span className="font-medium text-sm sm:text-base">Mời bạn bè</span>
          </Card>

          <Card
            className="bg-white p-3 sm:p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push("/appointments")}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 text-sm sm:text-base">📅</span>
            </div>
            <span className="font-medium text-sm sm:text-base">Đặt hẹn</span>
          </Card>
        </div>
      </div>

      {/* Farm Section */}
      <Card
        className="bg-white rounded-2xl p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => router.push("/farm-tour")}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-emerald-600 font-bold text-lg sm:text-xl lg:text-2xl">Trang trại</h3>
            <h4 className="text-emerald-500 font-medium text-sm sm:text-base lg:text-lg">của chúng tôi</h4>
            <Button
              variant="outline"
              className="mt-2 sm:mt-3 text-emerald-600 border-emerald-600 bg-transparent hover:bg-emerald-50 text-sm sm:text-base"
            >
              Kiểm tra→
            </Button>
          </div>
          <img
            src="/black-and-white-dairy-cow-head.jpg"
            alt="Cow"
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg ml-4"
          />
        </div>
      </Card>
    </div>
  )
}
