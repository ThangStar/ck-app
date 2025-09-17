"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function TransactionHistoryPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const transactions = [
    {
      id: "TXN001",
      type: "deposit",
      amount: 500000,
      status: "completed",
      date: "2024-01-15 14:30",
      description: "Nạp tiền qua Vietcombank",
    },
    {
      id: "TXN002",
      type: "withdraw",
      amount: 200000,
      status: "completed",
      date: "2024-01-14 09:15",
      description: "Rút tiền về Techcombank",
    },
    {
      id: "TXN003",
      type: "investment",
      amount: 1000000,
      status: "completed",
      date: "2024-01-13 16:45",
      description: "Đầu tư ANGUS 0810 (Cái)",
    },
    {
      id: "TXN004",
      type: "withdraw",
      amount: 150000,
      status: "pending",
      date: "2024-01-12 11:20",
      description: "Rút tiền về BIDV",
    },
    {
      id: "TXN005",
      type: "commission",
      amount: 50000,
      status: "completed",
      date: "2024-01-11 08:30",
      description: "Hoa hồng từ đội nhóm",
    },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />
      case "withdraw":
        return <ArrowUpRight className="w-5 h-5 text-red-600" />
      case "investment":
        return <ArrowUpRight className="w-5 h-5 text-blue-600" />
      case "commission":
        return <ArrowDownLeft className="w-5 h-5 text-purple-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50"
      case "pending":
        return "text-yellow-600 bg-yellow-50"
      case "failed":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Thành công"
      case "pending":
        return "Đang xử lý"
      case "failed":
        return "Thất bại"
      default:
        return "Không xác định"
    }
  }

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === "all") return true
    return tx.type === activeTab
  })

  return (
    <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative z-10">
        <StatusBar />

        <div className="px-4 md:px-6 pb-24">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white text-xl font-bold">LỊCH SỬ GIAO DỊCH</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { key: "all", label: "Tất cả" },
              { key: "deposit", label: "Nạp tiền" },
              { key: "withdraw", label: "Rút tiền" },
              { key: "investment", label: "Đầu tư" },
              { key: "commission", label: "Hoa hồng" },
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

          {/* Transaction List */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="bg-white p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                      <p className="text-xs text-gray-400">#{transaction.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-lg ${
                        transaction.type === "deposit" || transaction.type === "commission"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "deposit" || transaction.type === "commission" ? "+" : "-"}
                      {transaction.amount.toLocaleString()}đ
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Chưa có giao dịch nào</p>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
