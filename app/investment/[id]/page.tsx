"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, Info, Clock, TrendingUp } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"

export default function InvestmentPage() {
  const router = useRouter()
  const params = useParams()
  const [step, setStep] = useState(1) // 1: Details, 2: Confirmation, 3: Success

  const investments = {
    "welfare-2-9": {
      title: "PHÚC LỢI QUỐC KHÁNH 2/9",
      image: "/vietnamese-flag-celebration-package.jpg",
      duration: "20 tuần",
      description: "Phần thưởng hiện vật",
      totalIncome: 6660000,
      price: 6660000,
      progress: 41.06,
      type: "welfare",
      roi: "0%",
      weeklyReturn: 333000,
      minVip: "Không yêu cầu",
    },
    "angus-female": {
      title: "ANGUS 0810 (Cái)",
      image: "/black-angus-cow-in-green-field.jpg",
      duration: "72 tuần",
      description: "Cấp độ nhận nuôi tối thiểu là vip 3",
      totalIncome: 1088640000,
      price: 252000000,
      progress: 35.67,
      type: "vip",
      roi: "332%",
      weeklyReturn: 15120000,
      minVip: "VIP 3",
    },
    "angus-male": {
      title: "ANGUS 0810 (Đực)",
      image: "/black-angus-bull-in-pasture.jpg",
      duration: "160 tuần",
      description: "Cấp độ nhận nuôi tối thiểu là vip 5",
      totalIncome: 4608000000,
      price: 480000000,
      progress: 73.0,
      type: "vip",
      roi: "860%",
      weeklyReturn: 28800000,
      minVip: "VIP 5",
    },
  }

  const investment = investments[params.id as keyof typeof investments]
  const currentBalance = 118500

  if (!investment) {
    return <div>Investment not found</div>
  }

  const canAfford = currentBalance >= investment.price

  return (
    <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative z-10">
        

        <div className="px-4 md:px-6 pb-24">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white text-xl font-bold">ĐẦU TƯ RANCH</h1>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Investment Image */}
              <Card className="bg-white p-4 rounded-2xl">
                <img
                  src={investment.image || "/placeholder.svg"}
                  alt={investment.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold text-emerald-600 mb-2">{investment.title}</h2>
                <p className="text-gray-600 text-sm">{investment.description}</p>
              </Card>

              {/* Investment Details */}
              <Card className="bg-white p-4 rounded-2xl">
                <h3 className="font-bold text-lg mb-4 text-emerald-600">THÔNG TIN ĐẦU TƯ</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Thời gian:</span>
                    </div>
                    <span className="font-medium">{investment.duration}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Lợi nhuận/tuần:</span>
                    </div>
                    <span className="font-medium text-green-600">{investment.weeklyReturn.toLocaleString()}đ</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Tổng thu nhập:</span>
                    </div>
                    <span className="font-medium text-emerald-600">{investment.totalIncome.toLocaleString()}đ</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">ROI:</span>
                    <span className="font-bold text-green-600">{investment.roi}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Yêu cầu VIP:</span>
                    <span className="font-medium">{investment.minVip}</span>
                  </div>
                </div>
              </Card>

              {/* Price and Balance */}
              <Card className="bg-white p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Số dư hiện tại:</span>
                  <span className="font-bold text-emerald-600">{currentBalance.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Giá đầu tư:</span>
                  <span className="font-bold text-2xl text-orange-500">{investment.price.toLocaleString()}đ</span>
                </div>

                {!canAfford && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-4">
                    <p className="text-red-600 text-sm">
                      Số dư không đủ. Vui lòng nạp thêm {(investment.price - currentBalance).toLocaleString()}đ
                    </p>
                  </div>
                )}
              </Card>

              <div className="flex gap-3">
                <Button
                  onClick={() => router.push("/deposit")}
                  variant="outline"
                  className="flex-1 py-3 rounded-2xl border-emerald-600 text-emerald-600"
                >
                  NẠP TIỀN
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canAfford}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold disabled:bg-gray-300"
                >
                  MUA NGAY
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Card className="bg-white p-4 rounded-2xl">
                <h3 className="font-bold text-lg mb-4 text-emerald-600">XÁC NHẬN ĐẦU TƯ</h3>

                <div className="flex gap-4 mb-4">
                  <img
                    src={investment.image || "/placeholder.svg"}
                    alt={investment.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-bold">{investment.title}</h4>
                    <p className="text-sm text-gray-600">{investment.duration}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số tiền đầu tư:</span>
                    <span className="font-bold">{investment.price.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lợi nhuận/tuần:</span>
                    <span className="text-green-600">{investment.weeklyReturn.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng thu nhập dự kiến:</span>
                    <span className="text-emerald-600 font-bold">{investment.totalIncome.toLocaleString()}đ</span>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1 py-3 rounded-2xl">
                  QUAY LẠI
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold"
                >
                  XÁC NHẬN
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-green-600" />
              </div>

              <Card className="bg-white p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-green-600 mb-4">ĐẦU TƯ THÀNH CÔNG!</h3>
                <p className="text-gray-600 mb-4">Bạn đã đầu tư thành công vào {investment.title}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Số tiền đầu tư:</p>
                  <p className="text-xl font-bold text-emerald-600">{investment.price.toLocaleString()}đ</p>
                  <p className="text-sm text-gray-500 mt-2">Mã đầu tư: #INV{Date.now().toString().slice(-6)}</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">Lợi nhuận sẽ được tính từ tuần tiếp theo.</p>
              </Card>

              <Button
                onClick={() => router.push("/activities")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-lg font-bold"
              >
                XEM ĐẦU TƯ CỦA TÔI
              </Button>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
