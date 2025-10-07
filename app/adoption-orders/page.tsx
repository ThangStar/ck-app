"use client"

import { StatusBar } from "@/components/status-bar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calendar, TrendingUp, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "@/lib/productSlice"
import type { RootState } from "@/lib/store"

export default function AdoptionOrdersPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(undefined)

  const { products, isLoading, error } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts({ adoption_duration: selectedDuration }) as any)
  }, [dispatch, selectedDuration])

  const filteredProducts = products.filter((product) => {
    if (activeTab === "short") return product.adoption_duration <= 6
    if (activeTab === "long") return product.adoption_duration > 6
    return true
  })

  return (
    <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
      <div className="relative z-10">
        

        <div className="px-4 md:px-6 pb-24">
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white text-xl font-bold">SẢN PHẨM NUÔI</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: "all", label: "Tất cả" },
              { key: "short", label: "Ngắn hạn" },
              { key: "long", label: "Dài hạn" },
            ].map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                variant={activeTab === tab.key ? "default" : "outline"}
                className={`flex-1 text-sm ${
                  activeTab === tab.key ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 border-emerald-600"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Duration Filter */}
          <div className="flex gap-2 mb-6">
            <Button
              onClick={() => setSelectedDuration(undefined)}
              variant={selectedDuration === undefined ? "default" : "outline"}
              className={`text-sm ${
                selectedDuration === undefined ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"
              }`}
            >
              Tất cả
            </Button>
            {[4, 6, 8, 12].map((duration) => (
              <Button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                variant={selectedDuration === duration ? "default" : "outline"}
                className={`text-sm ${
                  selectedDuration === duration ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"
                }`}
              >
                {duration} tháng
              </Button>
            ))}
          </div>

          {/* Products List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-gray-400 animate-spin" />
                </div>
                <p className="text-gray-500">Đang tải sản phẩm...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Card key={product.id} className="bg-white/90 p-4 rounded-2xl">
                  <div className="flex gap-4">
                    <img
                      src={product.animal_image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900">{product.name}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                          {product.adoption_duration} tháng
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600 text-xs">{product.description}</p>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Thu nhập dự kiến:</span>
                          <span className="font-medium text-green-600">{product.total_income.toLocaleString()}đ</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Thời gian nuôi:</span>
                          <span className="font-medium text-blue-600">{product.adoption_duration} tháng</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => router.push(`/products/${product.id}`)}
                        variant="outline"
                        size="sm"
                        className="w-full mt-3 text-emerald-600 border-emerald-600 hover:bg-emerald-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {!isLoading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Không có sản phẩm nào</p>
              <p className="text-sm text-gray-400">Thử thay đổi bộ lọc để xem thêm sản phẩm</p>
            </div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
