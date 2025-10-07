"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Check, Upload, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function VerifyNamePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
    address: "",
    frontImage: null as File | null,
    backImage: null as File | null,
  })

  const handleFileUpload = (type: "front" | "back", file: File) => {
    setFormData((prev) => ({
      ...prev,
      [type === "front" ? "frontImage" : "backImage"]: file,
    }))
  }

  return (
    <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative z-10">
        

        <div className="px-4 md:px-6 pb-24">
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white text-xl font-bold">XÁC MINH DANH TÍNH</h1>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <Card className="bg-white/90 p-4 rounded-2xl">
                <h3 className="font-bold text-emerald-600 mb-4">THÔNG TIN CÁ NHÂN</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Họ và tên</label>
                    <Input
                      placeholder="Nhập họ tên đầy đủ..."
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Số CMND/CCCD</label>
                    <Input
                      placeholder="Nhập số CMND/CCCD..."
                      value={formData.idNumber}
                      onChange={(e) => setFormData((prev) => ({ ...prev, idNumber: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ngày sinh</label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Địa chỉ</label>
                    <Input
                      placeholder="Nhập địa chỉ thường trú..."
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                </div>
              </Card>

              <Card className="bg-white/90 p-4 rounded-2xl">
                <h3 className="font-bold text-emerald-600 mb-4">TẢI LÊN GIẤY TỜ</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Mặt trước CMND/CCCD</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Chọn ảnh mặt trước</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload("front", e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mặt sau CMND/CCCD</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Chọn ảnh mặt sau</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload("back", e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold"
              >
                GỬI XÁC MINH
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-blue-600" />
              </div>

              <Card className="bg-white/90 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-blue-600 mb-4">YÊU CẦU ĐÃ ĐƯỢC GỬI</h3>
                <p className="text-gray-600 mb-4">Thông tin xác minh của bạn đã được gửi thành công.</p>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-yellow-700">Thời gian xử lý: 1-3 ngày làm việc</p>
                </div>
              </Card>

              <Button
                onClick={() => router.push("/profile")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold"
              >
                QUAY VỀ TRANG CHỦ
              </Button>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
