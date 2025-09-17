"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Target, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"

export default function Missions() {
  const [completedMissions, setCompletedMissions] = useState([1])

  const missions = [
    {
      id: 1,
      title: "Đầu tư lần đầu",
      description: "Thực hiện giao dịch đầu tư đầu tiên",
      reward: "50,000đ",
      completed: true,
    },
    {
      id: 2,
      title: "Mời 3 bạn bè",
      description: "Giới thiệu 3 người bạn tham gia",
      reward: "100,000đ",
      completed: false,
    },
    {
      id: 3,
      title: "Điểm danh 7 ngày",
      description: "Điểm danh liên tục trong 7 ngày",
      reward: "75,000đ",
      completed: false,
    },
    {
      id: 4,
      title: "Đầu tư 1 triệu",
      description: "Tổng số tiền đầu tư đạt 1,000,000đ",
      reward: "200,000đ",
      completed: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400">
      <StatusBar />

      <div className="px-4 sm:px-6 lg:px-8 pb-24 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pt-4">
          <Button variant="ghost" size="sm" className="text-white p-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-white text-xl sm:text-2xl font-bold">Nhiệm Vụ</h1>
        </div>

        {/* Progress Overview */}
        <Card className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6">
          <div className="text-center">
            <Target className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-emerald-600 mb-2">Tiến độ nhiệm vụ</h2>
            <p className="text-3xl font-bold text-orange-500">
              {completedMissions.length}/{missions.length}
            </p>
            <p className="text-gray-600 mt-2">Hoàn thành nhiệm vụ để nhận thưởng!</p>
          </div>
        </Card>

        {/* Mission Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white p-4 text-center rounded-2xl">
            <span className="text-2xl mb-2 block">📈</span>
            <h3 className="font-bold text-sm">Đầu tư</h3>
          </Card>
          <Card className="bg-white p-4 text-center rounded-2xl">
            <span className="text-2xl mb-2 block">👥</span>
            <h3 className="font-bold text-sm">Giới thiệu</h3>
          </Card>
          <Card className="bg-white p-4 text-center rounded-2xl">
            <span className="text-2xl mb-2 block">📅</span>
            <h3 className="font-bold text-sm">Hàng ngày</h3>
          </Card>
        </div>

        {/* Mission List */}
        <div className="space-y-4">
          <h2 className="text-white text-lg font-bold">Danh sách nhiệm vụ</h2>

          {missions.map((mission) => (
            <Card key={mission.id} className="bg-white rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    mission.completed ? "bg-emerald-100" : "bg-orange-100"
                  }`}
                >
                  {mission.completed ? (
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Clock className="w-6 h-6 text-orange-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{mission.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{mission.description}</p>
                  <p className="text-emerald-600 font-bold">Thưởng: {mission.reward}</p>
                </div>
                <Button
                  className={`${
                    mission.completed
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                  disabled={mission.completed}
                >
                  {mission.completed ? "Hoàn thành" : "Thực hiện"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
