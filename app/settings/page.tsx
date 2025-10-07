"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Bell, Shield, Eye, Smartphone, HelpCircle, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SettingsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityVisible: false,
  })

  const settingsGroups = [
    {
      title: "Thông báo",
      icon: Bell,
      items: [
        {
          label: "Thông báo đẩy",
          type: "toggle",
          value: notifications.push,
          onChange: (value: boolean) => setNotifications((prev) => ({ ...prev, push: value })),
        },
        {
          label: "Email thông báo",
          type: "toggle",
          value: notifications.email,
          onChange: (value: boolean) => setNotifications((prev) => ({ ...prev, email: value })),
        },
        {
          label: "SMS thông báo",
          type: "toggle",
          value: notifications.sms,
          onChange: (value: boolean) => setNotifications((prev) => ({ ...prev, sms: value })),
        },
      ],
    },
    {
      title: "Bảo mật",
      icon: Shield,
      items: [
        {
          label: "Đổi mật khẩu",
          type: "link",
          path: "/change-password",
        },
        {
          label: "Xác thực 2 bước",
          type: "link",
          path: "/two-factor",
        },
        {
          label: "Thiết bị đăng nhập",
          type: "link",
          path: "/login-devices",
        },
      ],
    },
    {
      title: "Quyền riêng tư",
      icon: Eye,
      items: [
        {
          label: "Hiển thị hồ sơ",
          type: "toggle",
          value: privacy.profileVisible,
          onChange: (value: boolean) => setPrivacy((prev) => ({ ...prev, profileVisible: value })),
        },
        {
          label: "Hiển thị hoạt động",
          type: "toggle",
          value: privacy.activityVisible,
          onChange: (value: boolean) => setPrivacy((prev) => ({ ...prev, activityVisible: value })),
        },
      ],
    },
    {
      title: "Ứng dụng",
      icon: Smartphone,
      items: [
        {
          label: "Phiên bản ứng dụng",
          type: "info",
          value: "v1.2.3",
        },
        {
          label: "Kiểm tra cập nhật",
          type: "link",
          path: "/check-updates",
        },
        {
          label: "Xóa cache",
          type: "action",
          action: () => alert("Cache đã được xóa"),
        },
      ],
    },
    {
      title: "Hỗ trợ",
      icon: HelpCircle,
      items: [
        {
          label: "Trung tâm trợ giúp",
          type: "link",
          path: "/help-center",
        },
        {
          label: "Liên hệ hỗ trợ",
          type: "link",
          path: "/contact-support",
        },
        {
          label: "Báo cáo lỗi",
          type: "link",
          path: "/report-bug",
        },
      ],
    },
    {
      title: "Pháp lý",
      icon: FileText,
      items: [
        {
          label: "Điều khoản sử dụng",
          type: "link",
          path: "/terms",
        },
        {
          label: "Chính sách bảo mật",
          type: "link",
          path: "/privacy-policy",
        },
        {
          label: "Giấy phép",
          type: "link",
          path: "/licenses",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative z-10">
        

        <div className="px-4 md:px-6 pb-24">
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white text-xl font-bold">CÀI ĐẶT</h1>
          </div>

          <div className="space-y-6">
            {settingsGroups.map((group, groupIndex) => {
              const IconComponent = group.icon
              return (
                <Card key={groupIndex} className="bg-white/90 p-4 rounded-2xl">
                  <h3 className="font-bold text-emerald-600 mb-4 flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    {group.title}
                  </h3>

                  <div className="space-y-3">
                    {group.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-2">
                        <span className="text-gray-700">{item.label}</span>

                        {item.type === "toggle" && (
                          <button
                            onClick={() => item.onChange && item.onChange(!item.value)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              item.value ? "bg-emerald-600" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                item.value ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        )}

                        {item.type === "link" && (
                          <Button
                            onClick={() => router.push(item.path || "/")}
                            variant="ghost"
                            size="sm"
                            className="text-emerald-600"
                          >
                            →
                          </Button>
                        )}

                        {item.type === "info" && <span className="text-sm text-gray-500">{item.value}</span>}

                        {item.type === "action" && (
                          <Button
                            onClick={item.action}
                            variant="outline"
                            size="sm"
                            className="text-emerald-600 border-emerald-600 bg-transparent"
                          >
                            Thực hiện
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
