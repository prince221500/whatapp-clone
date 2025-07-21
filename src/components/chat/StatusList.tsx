import { useState } from 'react'
import { Plus, Eye } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { formatDistanceToNow } from 'date-fns'

interface Status {
  id: string
  user: {
    id: string
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  viewed: boolean
}

export default function StatusList() {
  const { user } = useAuthStore()
  const [statuses] = useState<Status[]>([
    {
      id: '1',
      user: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
      },
      content: 'Having a great day! 🌟',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      viewed: false
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
      },
      content: 'Beautiful sunset today 🌅',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      viewed: true
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Mike Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
      },
      content: 'Coffee time ☕',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      viewed: false
    }
  ])

  const myStatus = {
    id: 'my-status',
    user: {
      id: user?.id || '',
      name: 'My Status',
      avatar: user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`
    },
    content: 'Tap to add status update',
    timestamp: new Date().toISOString(),
    viewed: true
  }

  const recentStatuses = statuses.filter(status => {
    const statusTime = new Date(status.timestamp)
    const now = new Date()
    const diffHours = (now.getTime() - statusTime.getTime()) / (1000 * 60 * 60)
    return diffHours <= 24
  })

  const viewedStatuses = recentStatuses.filter(status => status.viewed)
  const unviewedStatuses = recentStatuses.filter(status => !status.viewed)

  return (
    <div className="divide-y divide-gray-700">
      {/* My Status */}
      <div className="p-4 hover-bg cursor-pointer transition-colors">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={myStatus.user.avatar}
              alt={myStatus.user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-whatsapp-primary rounded-full flex items-center justify-center border-2 border-whatsapp-sidebar-bg">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium">My Status</h3>
            <p className="text-whatsapp-gray text-sm">Tap to add status update</p>
          </div>
        </div>
      </div>

      {/* Recent Updates Header */}
      {(unviewedStatuses.length > 0 || viewedStatuses.length > 0) && (
        <div className="px-4 py-2 bg-whatsapp-message-bg">
          <p className="text-whatsapp-gray text-sm font-medium">Recent updates</p>
        </div>
      )}

      {/* Unviewed Statuses */}
      {unviewedStatuses.map((status) => (
        <div
          key={status.id}
          className="p-4 hover-bg cursor-pointer transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-r from-whatsapp-primary to-green-400">
                <img
                  src={status.user.avatar}
                  alt={status.user.name}
                  className="w-full h-full rounded-full border-2 border-whatsapp-sidebar-bg"
                />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium">{status.user.name}</h3>
              <p className="text-whatsapp-gray text-sm">
                {formatDistanceToNow(new Date(status.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Viewed Statuses Header */}
      {viewedStatuses.length > 0 && (
        <div className="px-4 py-2 bg-whatsapp-message-bg">
          <p className="text-whatsapp-gray text-sm font-medium">Viewed updates</p>
        </div>
      )}

      {/* Viewed Statuses */}
      {viewedStatuses.map((status) => (
        <div
          key={status.id}
          className="p-4 hover-bg cursor-pointer transition-colors opacity-60"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={status.user.avatar}
                alt={status.user.name}
                className="w-12 h-12 rounded-full border-2 border-gray-600"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                <Eye className="w-2 h-2 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium">{status.user.name}</h3>
              <p className="text-whatsapp-gray text-sm">
                {formatDistanceToNow(new Date(status.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Empty State */}
      {recentStatuses.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-whatsapp-gray">
          <div className="w-16 h-16 rounded-full border-2 border-whatsapp-gray mb-4 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-whatsapp-gray"></div>
          </div>
          <p className="text-lg mb-2">No recent updates</p>
          <p className="text-sm text-center">
            Status updates from your contacts will appear here
          </p>
        </div>
      )}
    </div>
  )
}