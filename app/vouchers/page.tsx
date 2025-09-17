"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Gift, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function VouchersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("available")

  const vouchers = [
    {
      id: 1,
      title: "Giảm 20% phí rút tiền",
      description: "Áp dụng cho lần rút tiền tiếp theo",
      discount: "20%",
      expiry: "2024-03-15",
      status: "available",
      minAmount: 100000,
    },
    {
      id: 2,
      title: "Miễn phí đầu tư",
      description: "Miễn phí cho gói đầu tư dưới 1 triệu",
      discount: "100%",
      expiry: "2024-02-28",
      status: "available",
      minAmount: 500000,
    },
    {
      id: 3,
      title: "Bonus 50,000đ",
      description: "Thưởng khi nạp tiền lần đầu",
      discount: "50,000đ",
      expiry: "2024-01-20",
      status: "used",
      minAmount: 1000000,
    },
    {
      id: 4,
      title: "Giảm 10% đầu tư",
      description: "Giảm giá cho tất cả gói đầu tư",
      discount: "10%",
      expiry: "2024-01-15",
      status: "expired",
      minAmount: 200000,
    },
  ]

  const filteredVouchers = vouchers.filter((voucher) => {
    if (activeTab === "available") return voucher.status === "available"
    if (activeTab === "used") return voucher.status === "used"
    if (activeTab === "expired") return voucher.status === "expired"
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-600 bg-green-50"
      case "used":
        return "text-blue-600 bg-blue-50"
      case "expired":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Có thể sử dụng"
      case "used":
        return "Đã sử dụng"
      case "expired":
        return "Đã hết hạn"
      default:
        return "Không xác định"
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative z-10">
        <StatusBar />

        <div className="px-4 md:px-6 pb-24">
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white text-xl font-bold">VOUCHER CỦA TÔI</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { key: "available", label: "Có thể dùng" },
              { key: "used", label: "Đã dùng" },
              { key: "expired", label: "Hết hạn" },
            ].map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                variant={activeTab === tab.key ? "default" : "outline"}
                className={`whitespace-nowrap text-sm ${
                  activeTab === tab.key ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 border-emerald-600"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Voucher List */}
          <div className="space-y-4">
            {filteredVouchers.map((voucher) => (
              <Card key={voucher.id} className="bg-white/90 p-4 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{voucher.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(voucher.status)}`}>
                        {getStatusText(voucher.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{voucher.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-orange-500">{voucher.discount}</div>
                        <div className="text-xs text-gray-500">Tối thiểu: {voucher.minAmount.toLocaleString()}đ</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          HSD: {voucher.expiry}
                        </div>
                        {voucher.status === "available" && (
                          <Button size="sm" className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                            Sử dụng
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredVouchers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Không có voucher nào</p>
              <p className="text-sm text-gray-400">Tham gia các hoạt động để nhận voucher</p>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
