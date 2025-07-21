import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Conversation } from '../../types'
import { formatDistanceToNow } from 'date-fns'

interface ChatHeaderProps {
  conversation: Conversation
}

export default function ChatHeader({ conversation }: ChatHeaderProps) {
  const navigate = useNavigate()
  const currentUserId = 'current-user'

  const getConversationName = () => {
    if (conversation.is_group) {
      return conversation.name || 'Group Chat'
    }
    
    const otherParticipant = conversation.participants.find(p => p.user_id !== currentUserId)
    return otherParticipant?.user.full_name || 'Unknown User'
  }

  const getConversationAvatar = () => {
    if (conversation.is_group) {
      return `https://api.dicebear.com/7.x/identicon/svg?seed=${conversation.id}`
    }
    
    const otherParticipant = conversation.participants.find(p => p.user_id !== currentUserId)
    return otherParticipant?.user.avatar_url || 
           `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherParticipant?.user.email}`
  }

  const getLastSeen = () => {
    if (conversation.is_group) {
      return `${conversation.participants.length} participants`
    }
    
    const otherParticipant = conversation.participants.find(p => p.user_id !== currentUserId)
    if (!otherParticipant) return 'Unknown'
    
    if (otherParticipant.user.is_online) {
      return 'Online'
    }
    
    return `Last seen ${formatDistanceToNow(new Date(otherParticipant.user.last_seen), { addSuffix: true })}`
  }

  return (
    <div className="bg-whatsapp-message-bg border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-whatsapp-gray hover:text-white hover:bg-gray-700 rounded-full transition-colors lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <img
              src={getConversationAvatar()}
              alt={getConversationName()}
              className="w-10 h-10 rounded-full"
            />
            {!conversation.is_group && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-whatsapp-message-bg"></div>
            )}
          </div>
          
          <div>
            <h2 className="text-white font-medium">
              {getConversationName()}
            </h2>
            <p className="text-whatsapp-gray text-sm">
              {getLastSeen()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-whatsapp-gray hover:text-white hover:bg-gray-700 rounded-full transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-whatsapp-gray hover:text-white hover:bg-gray-700 rounded-full transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-whatsapp-gray hover:text-white hover:bg-gray-700 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}