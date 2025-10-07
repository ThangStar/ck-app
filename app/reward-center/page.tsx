"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Diamond, Gift } from "lucide-react"

export default function RewardCenter() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400">
      

      <div className="px-4 sm:px-6 lg:px-8 pb-24 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pt-4">
          <Button variant="ghost" size="sm" className="text-white p-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl sm:text-2xl font-bold">Trung Tâm Đổi Quà</h1>
        </div>

        {/* Diamond Balance */}
        <Card className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Diamond className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Số kim cương</h3>
                <p className="text-2xl font-bold text-orange-500">1,250</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Reward Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white p-4 text-center rounded-2xl">
            <Gift className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-sm">Quà tặng</h3>
          </Card>
          <Card className="bg-white p-4 text-center rounded-2xl">
            <span className="text-2xl mb-2 block">💰</span>
            <h3 className="font-bold text-sm">Tiền mặt</h3>
          </Card>
          <Card className="bg-white p-4 text-center rounded-2xl">
            <span className="text-2xl mb-2 block">🎫</span>
            <h3 className="font-bold text-sm">Voucher</h3>
          </Card>
        </div>

        {/* Available Rewards */}
        <div className="space-y-4">
          <h2 className="text-white text-lg font-bold">Quà tặng có sẵn</h2>

          <Card className="bg-white rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <img src="/colorful-gift-box.png" alt="Gift" className="w-15 h-15 rounded-lg" />
              <div className="flex-1">
                <h3 className="font-bold">Hộp quà đặc biệt</h3>
                <p className="text-sm text-gray-600">Chứa nhiều phần quà hấp dẫn</p>
                <p className="text-orange-500 font-bold">500 kim cương</p>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Đổi</Button>
            </div>
          </Card>

          <Card className="bg-white rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <img src="/cash-money.jpg" alt="Cash" className="w-15 h-15 rounded-lg" />
              <div className="flex-1">
                <h3 className="font-bold">Tiền mặt 100,000đ</h3>
                <p className="text-sm text-gray-600">Rút về tài khoản ngân hàng</p>
                <p className="text-orange-500 font-bold">1,000 kim cương</p>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Đổi</Button>
            </div>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
