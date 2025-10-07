"use client"

import { useState } from "react"
import ProductsList from "@/components/products-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ClientOnly from "@/components/client-only"

export default function ProductsPage() {
  const [filter, setFilter] = useState<{
    type?: string
    vip_required?: number
  }>({})

  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </div>
        </div>
      }
    >
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Danh Sách Sản Phẩm</h1>
            <p className="text-gray-600">Khám phá các sản phẩm đầu tư chăn nuôi bò</p>
          </div>

          {/* Filter Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Bộ lọc sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant={filter.type === undefined ? "default" : "outline"}
                  onClick={() => setFilter({ ...filter, type: undefined })}
                >
                  Tất cả loại
                </Button>
                <Button
                  variant={filter.type === "cai" ? "default" : "outline"}
                  onClick={() => setFilter({ ...filter, type: "cai" })}
                >
                  Cái
                </Button>
                <Button
                  variant={filter.vip_required === 0 ? "default" : "outline"}
                  onClick={() => setFilter({ ...filter, vip_required: 0 })}
                >
                  Không yêu cầu VIP
                </Button>
                <Button
                  variant={filter.vip_required === 1 ? "default" : "outline"}
                  onClick={() => setFilter({ ...filter, vip_required: 1 })}
                >
                  VIP 1
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products List */}
          <ProductsList type={filter.type} vip_required={filter.vip_required} />
        </div>
      </div>
    </ClientOnly>
  )
}
