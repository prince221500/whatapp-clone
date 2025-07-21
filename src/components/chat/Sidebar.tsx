import { useState } from 'react'
import { Search, MessageCircle, Settings, QrCode, Phone } from 'lucide-react'
import { useChatStore } from '../../store/chatStore'
import ConversationList from './ConversationList'
import UserList from './UserList'
import StatusList from './StatusList'
import ProfileModal from './ProfileModal'

type SidebarTab = 'chats' | 'status' | 'calls'

export default function Sidebar() {
  const { searchQuery, setSearchQuery } = useChatStore()
  const [activeTab, setActiveTab] = useState<SidebarTab>('chats')
  const [showProfile, setShowProfile] = useState(false)

  // Mock user data
  const mockUser = {
    id: 'current-user',
    email: 'you@example.com',
    full_name: 'You',
    avatar_url: null,
    status: 'Hey there! I am using WhatsApp.',
    last_seen: new Date().toISOString(),
    is_online: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  return (
    <>
      <div className="w-80 bg-whatsapp-sidebar-bg border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-whatsapp-message-bg">
          <div className="flex items-center justify-between mb-4">
            {/* Left - WhatsApp Logo */}
            <div className="flex items-center space-x-2">
              <h1 className="text-whatsapp-primary text-xl font-bold">WhatsApp</h1>
            </div>

            {/* Center - QR Scanner */}
            <button className="p-2 text-whatsapp-gray hover:text-white hover:bg-gray-700 rounded-full transition-colors">
              <QrCode className="w-5 h-5" />
            </button>

            {/* Right - Settings */}
            <button
              onClick={() => setShowProfile(true)}
              className="p-2 text-whatsapp-gray hover:text-white hover:bg-gray-700 rounded-full transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUser.email}`}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setShowProfile(true)}
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-whatsapp-message-bg online-pulse"></div>
            </div>
            <div>
              <h2 className="text-white font-medium">
                {mockUser.full_name}
              </h2>
              <p className="text-whatsapp-gray text-sm">Online</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-whatsapp-gray w-4 h-4" />
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-whatsapp-dark text-white rounded-lg border border-gray-600 focus:outline-none focus:border-whatsapp-primary transition-colors"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-whatsapp-message-bg border-b border-gray-700">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 transition-colors ${
              activeTab === 'chats'
                ? 'text-whatsapp-primary border-b-2 border-whatsapp-primary'
                : 'text-whatsapp-gray hover:text-white'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Chats</span>
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 transition-colors ${
              activeTab === 'status'
                ? 'text-whatsapp-primary border-b-2 border-whatsapp-primary'
                : 'text-whatsapp-gray hover:text-white'
            }`}
          >
            <div className="w-4 h-4 rounded-full border-2 border-current"></div>
            <span className="text-sm font-medium">Status</span>
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 transition-colors ${
              activeTab === 'calls'
                ? 'text-whatsapp-primary border-b-2 border-whatsapp-primary'
                : 'text-whatsapp-gray hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Calls</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'chats' && <ConversationList />}
          {activeTab === 'status' && <StatusList />}
          {activeTab === 'calls' && <UserList />}
        </div>
      </div>

      {showProfile && (
        <ProfileModal onClose={() => setShowProfile(false)} />
      )}
    </>
  )
}