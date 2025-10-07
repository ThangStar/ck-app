"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  ShoppingBag, 
  Users, 
  Bell, 
  DollarSign, 
  Play, 
  HelpCircle, 
  CheckCircle,
  Clock,
  TrendingUp,
  UserPlus,
  UserCheck,
  UserX,
  X
} from "lucide-react"
import { apiClient } from "@/lib/api"

interface GameInterfaceProps {
  onClose: () => void
}

export function GameInterface({ onClose }: GameInterfaceProps) {
  const [activeTab, setActiveTab] = useState("eggs")
  const [eggs, setEggs] = useState<any[]>([])
  const [friends, setFriends] = useState<any[]>([])
  const [pendingInvitations, setPendingInvitations] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [incubationStatus, setIncubationStatus] = useState<any>(null)
  
  // Form states
  const [friendUsername, setFriendUsername] = useState("")
  const [helperUsername, setHelperUsername] = useState("")
  const [selectedEggId, setSelectedEggId] = useState<number | null>(null)
  const [showHelpModal, setShowHelpModal] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load all data
      const [eggsData, friendsData, invitationsData, notificationsData, unreadCountData, statusData] = await Promise.all([
        apiClient.getPurchasedEggs(),
        apiClient.getFriendList(),
        apiClient.getPendingInvitations(),
        apiClient.getNotifications(),
        apiClient.getUnreadNotificationCount(),
        apiClient.getIncubationStatus()
      ])
      
      setEggs(eggsData)
      setFriends(friendsData)
      setPendingInvitations(invitationsData)
      setNotifications(notificationsData.notifications)
      setUnreadCount(unreadCountData)
      setIncubationStatus(statusData)
    } catch (error) {
      console.error("Failed to load data:", error)
    }
  }

  const handleStartIncubation = async (eggId: number) => {
    try {
      await apiClient.startIncubation(eggId)
      loadData()
    } catch (error) {
      console.error("Failed to start incubation:", error)
    }
  }

  const handleClaimIncome = async (eggId: number) => {
    try {
      await apiClient.claimIncome(eggId)
      loadData()
    } catch (error) {
      console.error("Failed to claim income:", error)
    }
  }

  const handleInviteFriend = async () => {
    if (!friendUsername) return
    
    try {
      await apiClient.inviteFriend(friendUsername)
      setFriendUsername("")
      loadData()
    } catch (error) {
      console.error("Failed to invite friend:", error)
    }
  }

  const handleAcceptInvitation = async (friendId: number) => {
    try {
      await apiClient.acceptFriendInvitation(friendId)
      loadData()
    } catch (error) {
      console.error("Failed to accept invitation:", error)
    }
  }

  const handleDeclineInvitation = async (friendId: number) => {
    try {
      await apiClient.declineFriendInvitation(friendId)
      loadData()
    } catch (error) {
      console.error("Failed to decline invitation:", error)
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
      loadData()
    } catch (error) {
      console.error("Failed to help incubation:", error)
    }
  }

  const handleMarkNotificationAsRead = async (notificationId: number) => {
    try {
      await apiClient.markNotificationAsRead(notificationId)
      loadData()
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const handleDeleteNotification = async (notificationId: number) => {
    try {
      await apiClient.deleteNotification(notificationId)
      loadData()
    } catch (error) {
      console.error("Failed to delete notification:", error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await apiClient.markAllNotificationsAsRead()
      loadData()
    } catch (error) {
      console.error("Failed to mark all as read:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Giao diện trò chơi</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex h-[70vh]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("eggs")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                  activeTab === "eggs" ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                Trứng của tôi
              </button>
              
              <button
                onClick={() => setActiveTab("friends")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                  activeTab === "friends" ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
                }`}
              >
                <Users className="w-5 h-5" />
                Bạn bè
              </button>
              
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                  activeTab === "notifications" ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
                }`}
              >
                <Bell className="w-5 h-5" />
                Thông báo
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === "eggs" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Trứng của tôi</h3>
                
                {/* Incubation Status */}
                {incubationStatus && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Đang ấp</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {incubationStatus.incubating?.length || 0}
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        <span className="font-medium">Sẵn sàng nhận</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {incubationStatus.ready_to_claim?.length || 0}
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-purple-500" />
                        <span className="font-medium">Hoàn thành</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">
                        {incubationStatus.completed?.length || 0}
                      </div>
                    </Card>
                  </div>
                )}
                
                {/* Eggs List */}
                <div className="space-y-4">
                  {eggs.map((egg) => (
                    <Card key={egg.id} className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={egg.product.animal_image || "/placeholder.svg"}
                          alt={egg.product.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold">{egg.product.name}</h4>
                          <div className="text-sm text-gray-600 mt-1">
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
                          
                          <div className="flex gap-2 mt-3">
                            {egg.status === "purchased" && (
                              <Button
                                onClick={() => handleStartIncubation(egg.id)}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <Play className="w-4 h-4 mr-1" />
                                Bắt đầu ấp
                              </Button>
                            )}
                            
                            {egg.status === "incubating" && (
                              <>
                                <Button
                                  onClick={() => handleHelpIncubation(egg.id)}
                                  size="sm"
                                  variant="outline"
                                >
                                  <HelpCircle className="w-4 h-4 mr-1" />
                                  Giúp đỡ
                                </Button>
                                <Button
                                  onClick={() => handleClaimIncome(egg.id)}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  Nhận tiền
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "friends" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Mời bạn bè</h3>
                  <div className="flex gap-2">
                    <Input
                      value={friendUsername}
                      onChange={(e) => setFriendUsername(e.target.value)}
                      placeholder="Nhập tên người dùng"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleInviteFriend}
                      disabled={!friendUsername}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Mời
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4">Lời mời đang chờ</h3>
                  <div className="space-y-2">
                    {pendingInvitations.map((invitation) => (
                      <Card key={invitation.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{invitation.friend_username}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(invitation.invited_at).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAcceptInvitation(invitation.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <UserCheck className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeclineInvitation(invitation.id)}
                              size="sm"
                              variant="outline"
                            >
                              <UserX className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4">Danh sách bạn bè</h3>
                  <div className="space-y-2">
                    {friends.map((friend) => (
                      <Card key={friend.id} className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-medium">{friend.friend_username}</div>
                            <div className="text-sm text-gray-500">
                              Kết bạn: {new Date(friend.accepted_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Thông báo</h3>
                  <Button
                    onClick={handleMarkAllAsRead}
                    size="sm"
                    variant="outline"
                  >
                    Đánh dấu tất cả đã đọc
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <Card key={notification.id} className={`p-4 ${!notification.is_read ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{notification.title}</h4>
                            {!notification.is_read && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                Mới
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="text-xs text-gray-500 mt-2">
                            {new Date(notification.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {!notification.is_read && (
                            <Button
                              onClick={() => handleMarkNotificationAsRead(notification.id)}
                              size="sm"
                              variant="outline"
                            >
                              Đã đọc
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteNotification(notification.id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
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
                <Input
                  value={helperUsername}
                  onChange={(e) => setHelperUsername(e.target.value)}
                  placeholder="Nhập tên người dùng"
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
    </div>
  )
}
