"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "@/lib/productSlice"
import { buyProduct, clearError, clearPurchaseSuccess, fetchPurchasedEggs } from "@/lib/purchaseSlice"
import { ShoppingBag, X, Play, DollarSign, Users, HelpCircle, Settings } from "lucide-react"
import { apiClient } from "@/lib/api"
import { GameInterface } from "@/components/game-interface"
import type { RootState } from "@/lib/store"

export function RanchActivities() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { products, isLoading, error } = useSelector((state: RootState) => state.products)
  const { purchaseSuccess, isLoading: isPurchasing, eggs } = useSelector((state: RootState) => state.purchase)
  const [activeTab, setActiveTab] = useState("vang")
  const [showEggsModal, setShowEggsModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [helperUsername, setHelperUsername] = useState("")
  const [selectedEggId, setSelectedEggId] = useState<number | null>(null)
  const [incubationStatus, setIncubationStatus] = useState<any>(null)
  const [showGameInterface, setShowGameInterface] = useState(false)

  useEffect(() => {
    const eggType = activeTab === "bac" ? "bac" : activeTab === "vang" ? "vang" : "kim_cuong"
    dispatch(fetchProducts({ egg_type: eggType }) as any)
  }, [dispatch, activeTab])

  // Filter products by active tab
  const filteredProducts = products.filter(product => {
    if (activeTab === "bac") return product.egg_type === "bac"
    if (activeTab === "vang") return product.egg_type === "vang"
    if (activeTab === "kim_cuong") return product.egg_type === "kim_cuong"
    return true
  })

  const handlePurchase = async (productId: number) => {
    try {
      await dispatch(buyProduct(productId) as any)
    } catch (error) {
      console.error("Purchase failed:", error)
    }
  }

  const handleShowEggs = async () => {
    setShowEggsModal(true)
    dispatch(fetchPurchasedEggs() as any)
    // Also fetch incubation status
    try {
      const status = await apiClient.getIncubationStatus()
      setIncubationStatus(status)
    } catch (error) {
      console.error("Failed to fetch incubation status:", error)
    }
  }

  const handleStartIncubation = async (eggId: number) => {
    try {
      await apiClient.startIncubation(eggId)
      // Refresh eggs list
      dispatch(fetchPurchasedEggs() as any)
    } catch (error) {
      console.error("Failed to start incubation:", error)
    }
  }

  const handleClaimIncome = async (eggId: number) => {
    try {
      await apiClient.claimIncome(eggId)
      // Refresh eggs list
      dispatch(fetchPurchasedEggs() as any)
    } catch (error) {
      console.error("Failed to claim income:", error)
    }
  }

  const handleHelpIncubation = (eggId: number) => {
    setSelectedEggId(eggId)
    setShowHelpModal(true)
  }

  const handleSubmitHelp = async () => {
    if (!selectedEggId || !helperUsername) return
    
    try {
      await apiClient.reduceIncubationTime(selectedEggId, helperUsername)
      setShowHelpModal(false)
      setHelperUsername("")
      setSelectedEggId(null)
      // Refresh eggs list
      dispatch(fetchPurchasedEggs() as any)
    } catch (error) {
      console.error("Failed to help incubation:", error)
    }
  }

  return (
    <div className="px-4 md:px-6 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-white text-xl md:text-2xl font-bold mb-4 md:mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        CỬA HÀNG
        </h1>

        {/* Success Message */}
        {purchaseSuccess && (
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 mx-4">
            Mua sản phẩm thành công! Kiểm tra trứng của bạn.
          </div>
        )}

        {/* Tabs */}
        <div className="flex justify-center gap-6 md:gap-8 mb-6">
          <button 
            onClick={() => setActiveTab("bac")}
            className={`text-white text-sm pb-1 ${
              activeTab === "bac" ? "font-bold border-b-2 border-white" : "opacity-70"
            }`}
          >
            BẠC
          </button>
          <button 
            onClick={() => setActiveTab("vang")}
            className={`text-white text-sm pb-1 ${
              activeTab === "vang" ? "font-bold border-b-2 border-white" : "opacity-70"
            }`}
          >
            VÀNG
          </button>
          <button 
            onClick={() => setActiveTab("kim_cuong")}
            className={`text-white text-sm pb-1 ${
              activeTab === "kim_cuong" ? "font-bold border-b-2 border-white" : "opacity-70"
            }`}
          >
            KIM CƯƠNG
          </button>
        </div>
      </div>

      {/* Products Section */}
      {filteredProducts.length > 0 && (
        <div className="space-y-4">
          <div className={`text-white text-center py-2 rounded-t-2xl font-bold text-sm md:text-base ${
            activeTab === "bac" ? "bg-gray-500" : 
            activeTab === "vang" ? "bg-yellow-500" : 
            "bg-purple-500"
          }`}>
            {activeTab === "bac" ? "SẢN PHẨM BẠC" : 
             activeTab === "vang" ? "SẢN PHẨM VÀNG" : 
             "SẢN PHẨM KIM CƯƠNG"}
          </div>

          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-white rounded-2xl p-3 md:p-4">
              <div className="flex gap-3 md:gap-4">
                <img
                  src={product.animal_image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-base md:text-lg mb-2">{product.name}</h3>
                  <div className="space-y-1 text-xs md:text-sm">
                    <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block">
                      Thời gian nhận nuôi: {product.adoption_duration} tháng
                    </div>
                    <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block">
                      Mô tả: {product.description}
                    </div>
                    <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block">
                      Thu nhập dự kiến: {product.total_income.toLocaleString()}đ
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <div className="text-orange-500 font-bold text-base md:text-lg">
                        {product.price.toLocaleString()}đ
                      </div>
                      <div className="text-xs md:text-sm text-gray-500">
                        {activeTab === "bac" ? "Sản phẩm bạc" : 
                         activeTab === "vang" ? "Sản phẩm vàng" : 
                         "Sản phẩm kim cương"}
                      </div>
                    </div>
                    <Button
                      onClick={() => handlePurchase(product.id)}
                      disabled={isPurchasing}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 md:px-6 text-sm disabled:opacity-50"
                    >
                      {isPurchasing ? "Đang mua..." : "Mua"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white">Đang tải sản phẩm...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 text-red-500">⚠️</div>
          </div>
          <p className="text-white">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 text-white">📦</div>
          </div>
          <p className="text-white">Chưa có sản phẩm nào</p>
          <p className="text-white/70 text-sm">Vui lòng thử lại sau</p>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-20 right-4 flex flex-col gap-3 z-50">
        <button
          onClick={handleShowEggs}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg"
        >
          <ShoppingBag className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => setShowGameInterface(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Eggs Modal */}
      {showEggsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Trứng của bạn</h2>
              <button
                onClick={() => setShowEggsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {eggs.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Chưa có trứng nào</p>
                  <p className="text-sm text-gray-400">Mua sản phẩm để bắt đầu ấp trứng</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {eggs.map((egg) => (
                    <Card key={egg.id} className="p-4">
                      <div className="flex gap-3">
                        <img
                          src={egg.product.animal_image || "/placeholder.svg"}
                          alt={egg.product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-sm">{egg.product.name}</h3>
                          <div className="text-xs text-gray-600 mt-1">
                            <div>Trạng thái: {
                              egg.status === "purchased" ? "Đã mua" :
                              egg.status === "incubating" ? "Đang ấp" :
                              "Hoàn thành"
                            }</div>
                            {egg.status === "incubating" && (
                              <div>Còn lại: {egg.incubation_days_remaining} ngày</div>
                            )}
                            {egg.status === "completed" && (
                              <div>Thu nhập: {egg.income_received.toLocaleString()}đ</div>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-3">
                            {egg.status === "purchased" && (
                              <Button
                                onClick={() => handleStartIncubation(egg.id)}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Bắt đầu ấp
                              </Button>
                            )}
                            
                            {egg.status === "incubating" && (
                              <>
                                <Button
                                  onClick={() => handleHelpIncubation(egg.id)}
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <HelpCircle className="w-3 h-3 mr-1" />
                                  Giúp đỡ
                                </Button>
                                <Button
                                  onClick={() => handleClaimIncome(egg.id)}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white text-xs"
                                >
                                  <DollarSign className="w-3 h-3 mr-1" />
                                  Nhận tiền
                                </Button>
                              </>
                            )}
                            
                            {egg.status === "completed" && (
                              <div className="text-green-600 text-xs font-medium">
                                ✓ Đã hoàn thành
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Giúp đỡ ấp trứng</h2>
              <button
                onClick={() => setShowHelpModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên người giúp đỡ
                </label>
                <input
                  type="text"
                  value={helperUsername}
                  onChange={(e) => setHelperUsername(e.target.value)}
                  placeholder="Nhập tên người dùng"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div className="text-sm text-gray-600">
                <p>• Người giúp đỡ sẽ giảm 1 ngày ấp trứng</p>
                <p>• Có thể mời bất kỳ ai, không cần là bạn bè</p>
                <p>• Mỗi người chỉ có thể giúp 1 lần</p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowHelpModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleSubmitHelp}
                  disabled={!helperUsername}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
                >
                  Gửi yêu cầu
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Interface */}
      {showGameInterface && (
        <GameInterface onClose={() => setShowGameInterface(false)} />
      )}
    </div>
  )
}
