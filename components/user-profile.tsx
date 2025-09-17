"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  CreditCard,
  FileText,
  Gift,
  Search,
  Clipboard,
  Zap,
  Star,
  Users,
  BarChart3,
  Settings,
  Globe,
  LogOut,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { logout } from "@/lib/authSlice"

export function UserProfile() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  const services = [
    { icon: FileText, label: "Xác minh tên", path: "/verify-name" },
    { icon: CreditCard, label: "Thẻ ngân hàng", path: "/bank-cards" },
    { icon: Gift, label: "Voucher", path: "/vouchers" },
    { icon: Search, label: "Chi tiết số tiền", path: "/transaction-details" },
    { icon: Clipboard, label: "Đơn nhận nuôi", path: "/adoption-orders" },
    { icon: Zap, label: "Lịch sử nạp rút", path: "/transaction-history" },
    { icon: Star, label: "Lịch sử Flashsale", path: "/flashsale-history" },
    { icon: Users, label: "Đội nhóm của tôi", path: "/my-team" },
    { icon: BarChart3, label: "Về chúng tôi", path: "/about-us" },
    { icon: Settings, label: "Cài đặt", path: "/settings" },
    { icon: Globe, label: "Ngôn ngữ", path: "/language" },
    { icon: LogOut, label: "Thoát", action: handleLogout },
  ]

  return (
    <div className="px-4 md:px-6 pb-24 max-w-md mx-auto">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-emerald-600 font-bold text-base md:text-lg">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        </div>
        {user?.name && <h2 className="text-white font-semibold text-lg">{user.name}</h2>}
        {user?.email && <p className="text-emerald-100 text-sm">{user.email}</p>}
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
        <Card className="bg-white p-3 md:p-4 text-center">
          <div className="text-emerald-600 text-xl md:text-2xl font-bold">
            {user?.balance?.toLocaleString("vi-VN") || "0"}đ
          </div>
          <div className="text-gray-600 text-xs md:text-sm">Số dư tài khoản</div>
        </Card>
        <Card className="bg-white p-3 md:p-4 text-center">
          <div className="text-emerald-600 text-xl md:text-2xl font-bold">118,500đ</div>
          <div className="text-gray-600 text-xs md:text-sm">Ví tiền mặt</div>
        </Card>
        <Card className="bg-white p-3 md:p-4 text-center">
          <div className="text-emerald-600 text-xl md:text-2xl font-bold">20</div>
          <div className="text-gray-600 text-xs md:text-sm">Kim cương của tôi</div>
        </Card>
        <Card className="bg-white p-3 md:p-4 text-center">
          <div className="text-emerald-600 text-xl md:text-2xl font-bold">630,000đ</div>
          <div className="text-gray-600 text-xs md:text-sm">Tổng rút</div>
        </Card>
        <Card className="bg-white p-3 md:p-4 text-center">
          <div className="text-emerald-600 text-xl md:text-2xl font-bold">0đ</div>
          <div className="text-gray-600 text-xs md:text-sm">Hoa hồng quỹ</div>
        </Card>
        <Card className="bg-white p-3 md:p-4 text-center">
          <div className="text-emerald-600 text-xl md:text-2xl font-bold">0đ</div>
          <div className="text-gray-600 text-xs md:text-sm">Phần thưởng quảng cáo</div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
        <Button
          onClick={() => router.push("/deposit")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-sm md:text-base"
        >
          💳 Nạp tiền
        </Button>
        <Button
          onClick={() => router.push("/withdraw")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-sm md:text-base"
        >
          🔄 Rút tiền
        </Button>
      </div>

      {/* Services Section */}
      <Card className="bg-white p-4 rounded-2xl">
        <h3 className="text-emerald-600 font-bold text-base md:text-lg mb-4">DỊCH VỤ THÀNH VIÊN</h3>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <button
                key={index}
                onClick={() => (service.action ? service.action() : router.push(service.path))}
                className="flex flex-col items-center gap-2 p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                </div>
                <span className="text-xs text-gray-700 text-center leading-tight">{service.label}</span>
              </button>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
