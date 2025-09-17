"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calendar, TrendingUp, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdoptionOrdersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("active")

  const orders = [
    {
      id: "ADO001",
      animalName: "ANGUS 0810 (Cái)",
      image: "/black-angus-cow-in-green-field.jpg",
      startDate: "2024-01-15",
      endDate: "2024-12-15",
      investment: 252000000,
      currentReturn: 45360000,
      totalReturn: 1088640000,
      progress: 35.67,
      status: "active",
      weeksLeft: 46,
    },
    {
      id: "ADO002",
      animalName: "PHÚC LỢI QUỐC KHÁNH 2/9",
      image: "/vietnamese-flag-celebration-package.jpg",
      startDate: "2024-02-01",
      endDate: "2024-07-01",
      investment: 6660000,
      currentReturn: 2664000,
      totalReturn: 6660000,
      progress: 40.0,
      status: "active",
      weeksLeft: 12,
    },
    {
      id: "ADO003",
      animalName: "ANGUS 0810 (Đực)",
      image: "/black-angus-bull-in-pasture.jpg",
      startDate: "2023-06-01",
      endDate: "2023-12-01",
      investment: 480000000,
      currentReturn: 4608000000,
      totalReturn: 4608000000,
      progress: 100,
      status: "completed",
      weeksLeft: 0,
    },
  ]

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "active") return order.status === "active"
    if (activeTab === "completed") return order.status === "completed"
    return true
  })

  return (
    <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative z-10">
        <StatusBar />

        <div className="px-4 md:px-6 pb-24">
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white text-xl font-bold">ĐƠN NHẬN NUÔI</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: "active", label: "Đang nuôi" },
              { key: "completed", label: "Hoàn thành" },
            ].map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                variant={activeTab === tab.key ? "default" : "outline"}
                className={`flex-1 text-sm ${
                  activeTab === tab.key ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 border-emerald-600"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="bg-white/90 p-4 rounded-2xl">
                <div className="flex gap-4">
                  <img
                    src={order.image || "/placeholder.svg"}
                    alt={order.animalName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{order.animalName}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "active" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {order.status === "active" ? "Đang nuôi" : "Hoàn thành"}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {order.startDate} - {order.endDate}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Đầu tư:</span>
                        <span className="font-medium">{order.investment.toLocaleString()}đ</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Đã nhận:</span>
                        <span className="font-medium text-green-600">{order.currentReturn.toLocaleString()}đ</span>
                      </div>

                      {order.status === "active" && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Còn lại:</span>
                          <span className="font-medium text-blue-600">{order.weeksLeft} tuần</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Tiến độ</span>
                        <span className="text-gray-700">{order.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <Button
                      onClick={() => router.push(`/adoption-orders/${order.id}`)}
                      variant="outline"
                      size="sm"
                      className="w-full mt-3 text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Chưa có đơn nhận nuôi nào</p>
              <p className="text-sm text-gray-400">Bắt đầu đầu tư để nhận nuôi gia súc</p>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
