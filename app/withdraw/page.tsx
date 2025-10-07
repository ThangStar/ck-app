"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Check, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function WithdrawPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountName, setAccountName] = useState("")
  const [step, setStep] = useState(1) // 1: Enter info, 2: Confirmation, 3: Success

  const currentBalance = 118500
  const minWithdraw = 50000

  const handleWithdraw = () => {
    setStep(3)
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
            <h1 className="text-white text-xl font-bold">RÚT TIỀN</h1>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Current Balance */}
              <Card className="bg-white/90 p-4 rounded-2xl">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Số dư khả dụng</p>
                  <p className="text-2xl font-bold text-emerald-600">{currentBalance.toLocaleString()} đ</p>
                </div>
              </Card>

              {/* Withdrawal Form */}
              <Card className="bg-white/90 p-4 rounded-2xl">
                <h3 className="font-bold mb-4">Thông tin rút tiền</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Số tiền rút</label>
                    <Input
                      type="number"
                      placeholder="Nhập số tiền..."
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Tối thiểu: {minWithdraw.toLocaleString()}đ</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tên ngân hàng</label>
                    <Input
                      placeholder="VD: Vietcombank, BIDV, Techcombank..."
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Số tài khoản</label>
                    <Input
                      placeholder="Nhập số tài khoản..."
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tên chủ tài khoản</label>
                    <Input
                      placeholder="Nhập tên chủ tài khoản..."
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[50000, 100000, 500000].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      onClick={() => setAmount(value.toString())}
                      className="text-sm"
                      disabled={value > currentBalance}
                    >
                      {value.toLocaleString()}đ
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={() => setAmount(currentBalance.toString())}
                  variant="outline"
                  className="w-full mt-2 text-sm"
                >
                  Rút tất cả ({currentBalance.toLocaleString()}đ)
                </Button>
              </Card>

              {/* Fees Info */}
              <Card className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">Phí và điều kiện</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Phí rút tiền: 0đ</li>
                      <li>• Thời gian xử lý: 1-3 ngày làm việc</li>
                      <li>• Rút tối thiểu: {minWithdraw.toLocaleString()}đ</li>
                      <li>• Giới hạn: 3 lần/ngày</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Button
                onClick={() => setStep(2)}
                disabled={
                  !amount ||
                  !bankAccount ||
                  !bankName ||
                  !accountName ||
                  Number.parseInt(amount) < minWithdraw ||
                  Number.parseInt(amount) > currentBalance
                }
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-lg font-bold"
              >
                XÁC NHẬN RÚT TIỀN
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Confirmation Details */}
              <Card className="bg-white/90 p-4 rounded-2xl">
                <h3 className="font-bold mb-4 text-emerald-600">XÁC NHẬN THÔNG TIN</h3>

                <div className="space-y-3">
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">Số tiền rút:</span>
                    <span className="font-bold text-emerald-600">{Number.parseInt(amount).toLocaleString()}đ</span>
                  </div>

                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">Phí giao dịch:</span>
                    <span className="font-medium">0đ</span>
                  </div>

                  <div className="flex justify-between p-2 bg-emerald-50 rounded border border-emerald-200">
                    <span className="text-emerald-700 font-medium">Số tiền nhận:</span>
                    <span className="font-bold text-emerald-600">{Number.parseInt(amount).toLocaleString()}đ</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Thông tin tài khoản nhận</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Ngân hàng:</span> {bankName}
                    </p>
                    <p>
                      <span className="text-gray-600">Số TK:</span> {bankAccount}
                    </p>
                    <p>
                      <span className="text-gray-600">Chủ TK:</span> {accountName}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1 py-3 rounded-2xl">
                  QUAY LẠI
                </Button>
                <Button
                  onClick={handleWithdraw}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold"
                >
                  XÁC NHẬN
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-green-600" />
              </div>

              <Card className="bg-white/90 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-green-600 mb-4">YÊU CẦU RÚT TIỀN THÀNH CÔNG</h3>
                <p className="text-gray-600 mb-4">Yêu cầu rút tiền của bạn đã được gửi thành công.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Số tiền rút:</p>
                  <p className="text-xl font-bold text-emerald-600">{Number.parseInt(amount).toLocaleString()} đ</p>
                  <p className="text-sm text-gray-500 mt-2">Mã giao dịch: #WD{Date.now().toString().slice(-6)}</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">Tiền sẽ được chuyển vào tài khoản trong 1-3 ngày làm việc.</p>
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
