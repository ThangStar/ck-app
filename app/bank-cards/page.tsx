"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, CreditCard, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function BankCardsPage() {
  const router = useRouter()
  const [showAddForm, setShowAddForm] = useState(false)
  const [cards, setCards] = useState([
    {
      id: 1,
      bankName: "Vietcombank",
      accountNumber: "1234567890",
      accountName: "NGUYEN VAN A",
      isDefault: true,
    },
  ])
  const [newCard, setNewCard] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
  })

  const handleAddCard = () => {
    if (newCard.bankName && newCard.accountNumber && newCard.accountName) {
      setCards((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...newCard,
          isDefault: false,
        },
      ])
      setNewCard({ bankName: "", accountNumber: "", accountName: "" })
      setShowAddForm(false)
    }
  }

  const handleDeleteCard = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id))
  }

  return (
    <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative z-10">
        

        <div className="px-4 md:px-6 pb-24">
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white text-xl font-bold">THẺ NGÂN HÀNG</h1>
          </div>

          {!showAddForm ? (
            <div className="space-y-4">
              <Button
                onClick={() => setShowAddForm(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                THÊM THẺ MỚI
              </Button>

              {cards.map((card) => (
                <Card key={card.id} className="bg-white/90 p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold">{card.bankName}</h4>
                        <p className="text-sm text-gray-600">**** **** **** {card.accountNumber.slice(-4)}</p>
                        <p className="text-xs text-gray-500">{card.accountName}</p>
                        {card.isDefault && (
                          <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                            Mặc định
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDeleteCard(card.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="bg-white/90 p-4 rounded-2xl">
                <h3 className="font-bold text-emerald-600 mb-4">THÊM THẺ NGÂN HÀNG</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tên ngân hàng</label>
                    <Input
                      placeholder="VD: Vietcombank, BIDV, Techcombank..."
                      value={newCard.bankName}
                      onChange={(e) => setNewCard((prev) => ({ ...prev, bankName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Số tài khoản</label>
                    <Input
                      placeholder="Nhập số tài khoản..."
                      value={newCard.accountNumber}
                      onChange={(e) => setNewCard((prev) => ({ ...prev, accountNumber: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tên chủ tài khoản</label>
                    <Input
                      placeholder="Nhập tên chủ tài khoản..."
                      value={newCard.accountName}
                      onChange={(e) => setNewCard((prev) => ({ ...prev, accountName: e.target.value }))}
                    />
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1 py-3 rounded-2xl">
                  HỦY
                </Button>
                <Button
                  onClick={handleAddCard}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold"
                >
                  THÊM THẺ
                </Button>
              </div>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
