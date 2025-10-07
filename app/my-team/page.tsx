"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Users, Share, Copy } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function MyTeamPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const referralCode = "RANCH2024"
  const referralLink = `https://saputoranch.com/ref/${referralCode}`

  const teamStats = {
    totalMembers: 12,
    activeMembers: 8,
    totalCommission: 2450000,
    thisMonthCommission: 450000,
  }

  const teamMembers = [
    { id: 1, name: "Nguyễn Văn A", joinDate: "2024-01-15", status: "active", commission: 150000 },
    { id: 2, name: "Trần Thị B", joinDate: "2024-01-20", status: "active", commission: 120000 },
    { id: 3, name: "Lê Văn C", joinDate: "2024-02-01", status: "inactive", commission: 80000 },
    { id: 4, name: "Phạm Thị D", joinDate: "2024-02-10", status: "active", commission: 200000 },
  ]

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative z-10">
        

        <div className="px-4 md:px-6 pb-24">
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white text-xl font-bold">ĐỘI NHÓM CỦA TÔI</h1>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-white/90 p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{teamStats.totalMembers}</div>
              <div className="text-sm text-gray-600">Tổng thành viên</div>
            </Card>
            <Card className="bg-white/90 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{teamStats.activeMembers}</div>
              <div className="text-sm text-gray-600">Đang hoạt động</div>
            </Card>
            <Card className="bg-white/90 p-4 text-center">
              <div className="text-lg font-bold text-orange-600">{teamStats.totalCommission.toLocaleString()}đ</div>
              <div className="text-sm text-gray-600">Tổng hoa hồng</div>
            </Card>
            <Card className="bg-white/90 p-4 text-center">
              <div className="text-lg font-bold text-blue-600">{teamStats.thisMonthCommission.toLocaleString()}đ</div>
              <div className="text-sm text-gray-600">Hoa hồng tháng này</div>
            </Card>
          </div>

          {/* Referral Section */}
          <Card className="bg-white/90 p-4 rounded-2xl mb-6">
            <h3 className="font-bold text-emerald-600 mb-4 flex items-center gap-2">
              <Share className="w-5 h-5" />
              GIỚI THIỆU BẠN BÈ
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Mã giới thiệu của bạn</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-100 p-3 rounded-lg font-mono text-center">{referralCode}</div>
                  <Button onClick={copyReferralLink} variant="outline" size="sm" className="px-3 bg-transparent">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Link giới thiệu</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-100 p-3 rounded-lg text-sm truncate">{referralLink}</div>
                  <Button onClick={copyReferralLink} variant="outline" size="sm" className="px-3 bg-transparent">
                    {copied ? "✓" : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-lg">
                <p className="text-sm text-emerald-700">
                  <strong>Hoa hồng:</strong> Nhận 10% từ mỗi giao dịch của người được giới thiệu
                </p>
              </div>
            </div>
          </Card>

          {/* Team Members */}
          <Card className="bg-white/90 p-4 rounded-2xl">
            <h3 className="font-bold text-emerald-600 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              DANH SÁCH THÀNH VIÊN
            </h3>

            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold text-sm">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-xs text-gray-500">Tham gia: {member.joinDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">{member.commission.toLocaleString()}đ</div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        member.status === "active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {member.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {teamMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Chưa có thành viên nào</p>
                <p className="text-sm text-gray-400">Chia sẻ mã giới thiệu để mời bạn bè tham gia</p>
              </div>
            )}
          </Card>
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
