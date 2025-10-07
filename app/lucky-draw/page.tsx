"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Gift, Star, Coins, Trophy, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LuckyDrawPage() {
  const router = useRouter()
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [drawCount, setDrawCount] = useState(3) // Free draws per day

  const prizes = [
    { id: 1, name: "10,000đ", type: "money", icon: Coins, color: "text-yellow-600", probability: 30 },
    { id: 2, name: "5 Kim cương", type: "diamond", icon: Star, color: "text-blue-600", probability: 25 },
    { id: 3, name: "50,000đ", type: "money", icon: Coins, color: "text-green-600", probability: 15 },
    { id: 4, name: "Voucher 20%", type: "voucher", icon: Gift, color: "text-purple-600", probability: 20 },
    { id: 5, name: "100,000đ", type: "money", icon: Trophy, color: "text-orange-600", probability: 8 },
    { id: 6, name: "Chúc may mắn", type: "nothing", icon: Zap, color: "text-gray-500", probability: 2 },
  ]

  const handleSpin = () => {
    if (drawCount <= 0) return

    setIsSpinning(true)
    setResult(null)

    // Simulate spinning animation
    setTimeout(() => {
      // Weighted random selection based on probability
      const random = Math.random() * 100
      let cumulative = 0
      let selectedPrize = prizes[prizes.length - 1] // Default to last prize

      for (const prize of prizes) {
        cumulative += prize.probability
        if (random <= cumulative) {
          selectedPrize = prize
          break
        }
      }

      setResult(selectedPrize)
      setIsSpinning(false)
      setDrawCount((prev) => prev - 1)
    }, 3000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative z-10">
        

        <div className="px-4 md:px-6 pb-24">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white text-xl font-bold">RÚT THĂM MAY MẮN</h1>
          </div>

          {/* Draw Count */}
          <Card className="bg-white/90 p-4 rounded-2xl mb-6 text-center">
            <h3 className="font-bold text-emerald-600 mb-2">Lượt quay miễn phí hôm nay</h3>
            <div className="text-3xl font-bold text-orange-500">{drawCount}/3</div>
            <p className="text-sm text-gray-600 mt-2">Reset vào 00:00 hàng ngày</p>
          </Card>

          {/* Lucky Wheel */}
          <Card className="bg-white/90 p-6 rounded-2xl mb-6">
            <div className="relative">
              {/* Wheel */}
              <div
                className={`w-64 h-64 mx-auto rounded-full border-8 border-emerald-600 relative overflow-hidden ${
                  isSpinning ? "animate-spin" : ""
                }`}
                style={{ animationDuration: isSpinning ? "3s" : "0s" }}
              >
                {prizes.map((prize, index) => {
                  const angle = (360 / prizes.length) * index
                  const IconComponent = prize.icon
                  return (
                    <div
                      key={prize.id}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: "center",
                      }}
                    >
                      <div
                        className={`absolute top-4 left-1/2 transform -translate-x-1/2 text-center ${
                          index % 2 === 0 ? "bg-emerald-100" : "bg-yellow-100"
                        } p-2 rounded-lg w-20`}
                      >
                        <IconComponent className={`w-4 h-4 mx-auto mb-1 ${prize.color}`} />
                        <div className="text-xs font-bold text-gray-800">{prize.name}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Center pointer */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white z-10"></div>

              {/* Pointer arrow */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 z-10"></div>
            </div>

            {/* Spin Button */}
            <div className="text-center mt-6">
              <Button
                onClick={handleSpin}
                disabled={isSpinning || drawCount <= 0}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSpinning ? "ĐANG QUAY..." : drawCount > 0 ? "QUAY NGAY" : "HẾT LƯỢT"}
              </Button>
            </div>
          </Card>

          {/* Result */}
          {result && (
            <Card className="bg-white/90 p-6 rounded-2xl mb-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <result.icon className={`w-8 h-8 ${result.color}`} />
              </div>
              <h3 className="text-xl font-bold text-emerald-600 mb-2">
                {result.type === "nothing" ? "Chúc bạn may mắn lần sau!" : "Chúc mừng bạn!"}
              </h3>
              <p className="text-lg font-bold text-gray-800 mb-4">
                Bạn đã nhận được: <span className={result.color}>{result.name}</span>
              </p>
              {result.type !== "nothing" && (
                <p className="text-sm text-gray-600">Phần thưởng đã được cộng vào tài khoản của bạn</p>
              )}
            </Card>
          )}

          {/* Prize List */}
          <Card className="bg-white/90 p-4 rounded-2xl">
            <h3 className="font-bold text-emerald-600 mb-4">DANH SÁCH PHẦN THƯỞNG</h3>
            <div className="space-y-2">
              {prizes.map((prize) => {
                const IconComponent = prize.icon
                return (
                  <div key={prize.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-5 h-5 ${prize.color}`} />
                      <span className="font-medium">{prize.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{prize.probability}%</span>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Rules */}
          <Card className="bg-yellow-50 p-4 rounded-2xl mt-4 border border-yellow-200">
            <h4 className="font-bold text-yellow-800 mb-2">QUY ĐỊNH</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Mỗi ngày được 3 lượt quay miễn phí</li>
              <li>• Lượt quay reset vào 00:00 hàng ngày</li>
              <li>• Phần thưởng sẽ được cộng tự động vào tài khoản</li>
              <li>• Voucher có thời hạn sử dụng 30 ngày</li>
              <li>• Mọi thắc mắc liên hệ bộ phận CSKH</li>
            </ul>
          </Card>
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
