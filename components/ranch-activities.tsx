"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function RanchActivities() {
  const router = useRouter()

  const investments = [
    {
      id: "welfare-2-9",
      title: "PHÚC LỢI QUỐC KHÁNH 2/9",
      image: "/vietnamese-flag-celebration-package.jpg",
      duration: "20 tuần",
      description: "Phần thưởng hiện vật",
      totalIncome: 6660000,
      price: 6660000,
      progress: 41.06,
      type: "welfare",
    },
    {
      id: "angus-female",
      title: "ANGUS 0810 (Cái)",
      image: "/black-angus-cow-in-green-field.jpg",
      duration: "72 tuần",
      description: "Cấp độ nhận nuôi tối thiểu là vip 3",
      totalIncome: 1088640000,
      price: 252000000,
      progress: 35.67,
      type: "vip",
    },
    {
      id: "angus-male",
      title: "ANGUS 0810 (Đực)",
      image: "/black-angus-bull-in-pasture.jpg",
      duration: "160 tuần",
      description: "Cấp độ nhận nuôi tối thiểu là vip 5",
      totalIncome: 4608000000,
      price: 480000000,
      progress: 73.0,
      type: "vip",
    },
  ]

  return (
    <div className="px-4 md:px-6 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-white text-xl md:text-2xl font-bold mb-4 md:mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          SAPUTO RANCH
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-6 md:gap-8 mb-6">
          <button className="text-white text-sm opacity-70">TÀI NGHIỆM</button>
          <button className="text-white text-sm font-bold border-b-2 border-white pb-1">KHU HOẠT ĐỘNG</button>
          <button className="text-white text-sm opacity-70">KHU SỞ CỦ</button>
        </div>
      </div>

      {/* Welfare Section */}
      <div className="mb-6">
        <div className="bg-lime-400 text-emerald-800 text-center py-2 rounded-t-2xl font-bold text-sm md:text-base">
          PHÚC LỢI GIỚI HẠN THỜI GIAN
        </div>

        <Card className="bg-white rounded-b-2xl p-3 md:p-4">
          <div className="flex gap-3 md:gap-4">
            <img
              src={investments[0].image || "/placeholder.svg"}
              alt="Phúc lợi quốc khánh"
              className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-base md:text-lg mb-2">{investments[0].title}</h3>
              <div className="space-y-1 text-xs md:text-sm">
                <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block">
                  Thời gian nhận nuôi: {investments[0].duration}
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block">
                  Mô tả: {investments[0].description}
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block">
                  Tổng thu nhập: {investments[0].totalIncome.toLocaleString()}đ
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <div className="text-orange-500 font-bold text-base md:text-lg">
                    {investments[0].price.toLocaleString()}đ
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">Tiền độ: {investments[0].progress}%</div>
                </div>
                <Button
                  onClick={() => router.push(`/investment/${investments[0].id}`)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 md:px-6 text-sm"
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* VIP Section */}
      <div className="space-y-4">
        <div className="bg-blue-500 text-white text-center py-2 rounded-t-2xl font-bold text-sm md:text-base">
          PHÚC LỢI VIP
        </div>

        {investments.slice(1).map((investment) => (
          <Card key={investment.id} className="bg-white rounded-2xl p-3 md:p-4">
            <div className="flex gap-3 md:gap-4">
              <img
                src={investment.image || "/placeholder.svg"}
                alt={investment.title}
                className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-base md:text-lg mb-2">{investment.title}</h3>
                <div className="space-y-1 text-xs md:text-sm">
                  <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block">
                    Thời gian nhận nuôi: {investment.duration}
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block">
                    Mô tả: {investment.description}
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block">
                    Tổng thu nhập: {investment.totalIncome.toLocaleString()}đ
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <div className="text-orange-500 font-bold text-base md:text-lg">
                      {investment.price.toLocaleString()}đ
                    </div>
                    <div className="text-xs md:text-sm text-gray-500">Tiền độ: {investment.progress}%</div>
                  </div>
                  <Button
                    onClick={() => router.push(`/investment/${investment.id}`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 md:px-6 text-sm"
                  >
                    Mua ngay
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
