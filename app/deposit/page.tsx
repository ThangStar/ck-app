"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DepositPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const [step, setStep] = useState(1) // 1: Enter amount, 2: Payment info, 3: Confirmation

  const bankInfo = {
    bankName: "Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)",
    accountNumber: "1234567890",
    accountName: "CONG TY TNHH SAPUTO RANCH",
    branch: "Chi nhánh Hà Nội",
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
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
            <h1 className="text-white text-xl font-bold">NẠP TIỀN</h1>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Current Balance */}
              <Card className="bg-white/90 p-4 rounded-2xl">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Số dư hiện tại</p>
                  <p className="text-2xl font-bold text-emerald-600">118,500 đ</p>
                </div>
              </Card>

              {/* Amount Input */}
              <Card className="bg-white/90 p-4 rounded-2xl">
                <h3 className="font-bold mb-4">Nhập số tiền muốn nạp</h3>
                <Input
                  type="number"
                  placeholder="Nhập số tiền..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg text-center"
                />

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[100000, 500000, 1000000, 2000000, 5000000, 10000000].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      onClick={() => setAmount(value.toString())}
                      className="text-sm"
                    >
                      {value.toLocaleString()}đ
                    </Button>
                  ))}
                </div>
              </Card>

              <Button
                onClick={() => setStep(2)}
                disabled={!amount || Number.parseInt(amount) < 10000}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-lg font-bold"
              >
                TIẾP TỤC
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Amount Summary */}
              <Card className="bg-white/90 p-4 rounded-2xl">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Số tiền nạp</p>
                  <p className="text-2xl font-bold text-emerald-600">{Number.parseInt(amount).toLocaleString()} đ</p>
                </div>
              </Card>

              {/* Bank Information */}
              <Card className="bg-white/90 p-4 rounded-2xl">
                <h3 className="font-bold mb-4 text-emerald-600">THÔNG TIN CHUYỂN KHOẢN</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Ngân hàng:</span>
                    <span className="font-medium text-right flex-1 ml-2">Vietcombank</span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Số tài khoản:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{bankInfo.accountNumber}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(bankInfo.accountNumber)}
                        className="p-1"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Chủ tài khoản:</span>
                    <span className="font-medium text-right flex-1 ml-2">{bankInfo.accountName}</span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Nội dung:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">NAP {amount}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(`NAP ${amount}`)}
                        className="p-1"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Lưu ý:</strong> Vui lòng chuyển khoản đúng số tiền và nội dung để được xử lý tự động.
                  </p>
                </div>
              </Card>

              <Button
                onClick={() => setStep(3)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-lg font-bold"
              >
                TÔI ĐÃ CHUYỂN TIỀN
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-green-600" />
              </div>

              <Card className="bg-white/90 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-green-600 mb-4">GIAO DỊCH ĐANG XỬ LÝ</h3>
                <p className="text-gray-600 mb-4">Chúng tôi đã nhận được thông báo chuyển khoản của bạn.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Số tiền:</p>
                  <p className="text-xl font-bold text-emerald-600">{Number.parseInt(amount).toLocaleString()} đ</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">Tiền sẽ được cộng vào tài khoản trong vòng 5-10 phút.</p>
              </Card>

              <Button
                onClick={() => router.push("/profile")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-lg font-bold"
              >
                XEM LỊCH SỬ GIAO DỊCH
              </Button>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
