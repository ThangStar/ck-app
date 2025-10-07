"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchProducts } from "@/lib/productSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ProductsListProps {
  type?: string
  vip_required?: number
}

export default function ProductsList({ type, vip_required }: ProductsListProps) {
  const dispatch = useAppDispatch()
  const { products, isLoading, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts({ type, vip_required }))
  }, [dispatch, type, vip_required])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <span className="ml-2 text-gray-600">Đang tải sản phẩm...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
        {error}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Không có sản phẩm nào
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                {product.type}
              </span>
              {product.vip_required > 0 && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  VIP {product.vip_required}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-emerald-600">
                {product.price.toLocaleString("vi-VN")} VNĐ
              </div>
              {product.description && (
                <p className="text-gray-600 text-sm">{product.description}</p>
              )}
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Xem chi tiết
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
