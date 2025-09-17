"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function RanchDashboard() {
  const router = useRouter()

  return (
    <div className="px-4 md:px-6 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-white text-lg md:text-xl font-bold mb-4 md:mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] bg-black/20 rounded-lg py-2 px-4 inline-block">
          QUỶ RANCH
        </h1>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-800 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <div className="text-center">
              <div className="text-white text-xs font-bold">SAPUTO RANCH</div>
              <div className="text-white text-xs">ADOPT A COW</div>
            </div>
          </div>
        </div>

        <h2 className="text-white text-xl md:text-2xl font-bold mb-4 md:mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] bg-black/20 rounded-lg py-2 px-4 inline-block">
          SAPUTO RANCH
        </h2>
      </div>

      {/* Total Fund */}
      <div className="mb-6 md:mb-8">
        <div className="bg-emerald-700 text-white text-center py-3 rounded-t-2xl font-medium text-sm md:text-base">
          TỔNG SỐ DỰ QUỶ RANCH
        </div>
        <div className="bg-yellow-100 text-emerald-700 text-center py-4 md:py-6 rounded-b-2xl">
          <div className="text-2xl md:text-3xl font-bold">78,356,588,600 đ</div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="space-y-3 md:space-y-4">
        {/* Lucky Draw */}
        <Card className="bg-emerald-600 text-white p-3 md:p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-emerald-500 rounded"></div>
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg">RÚT THĂM MAY MẮN</h3>
                <p className="text-xs md:text-sm opacity-90">Thắng 100%, nhiều bất ngờ</p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/lucky-draw")}
              className="bg-white text-emerald-600 hover:bg-gray-100 rounded-full px-4 md:px-6 text-sm"
            >
              Đi tới
            </Button>
          </div>
        </Card>

        {/* Investment */}
        <Card className="bg-emerald-600 text-white p-3 md:p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded"></div>
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg">ĐẦU TƯ RANCH</h3>
                <p className="text-xs md:text-sm opacity-90">100 % an toàn, rút gửi bất cứ lúc nào</p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/activities")}
              className="bg-white text-emerald-600 hover:bg-gray-100 rounded-full px-4 md:px-6 text-sm"
            >
              Đi tới
            </Button>
          </div>
        </Card>

        {/* Commission Fund */}
        <Card className="bg-emerald-600 text-white p-3 md:p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded"></div>
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg">HOA HỒNG QUỶ</h3>
                <p className="text-xs md:text-sm opacity-90">Hiện tại mỗi 0.001%~626,853đ</p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/commission")}
              className="bg-white text-emerald-600 hover:bg-gray-100 rounded-full px-4 md:px-6 text-sm"
            >
              Đi tới
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
