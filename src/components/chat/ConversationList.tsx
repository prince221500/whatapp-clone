import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { useChatStore } from '../../store/chatStore'
import { Check, CheckCheck } from 'lucide-react'

export default function ConversationList() {
  const navigate = useNavigate()
  const { conversations, searchQuery, currentConversation } = useChatStore()

  // Mock current user ID
  const currentUserId = 'current-user'

  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true
    
    const otherParticipant = conv.participants.find(p => p.user_id !== currentUserId)
    const searchTerm = searchQuery.toLowerCase()
    
    return (
      conv.name?.toLowerCase().includes(searchTerm) ||
      otherParticipant?.user.full_name.toLowerCase().includes(searchTerm) ||
      conv.last_message?.content.toLowerCase().includes(searchTerm)
    )
  })

  const handleConversationClick = (conversationId: string) => {
    navigate(`/chat/${conversationId}`)
  }

  const getConversationName = (conversation: any) => {
    if (conversation.is_group) {
      return conversation.name || 'Group Chat'
    }
    
    const otherParticipant = conversation.participants.find((p: any) => p.user_id !== currentUserId)
    return otherParticipant?.user.full_name || 'Unknown User'
  }

  const getConversationAvatar = (conversation: any) => {
    if (conversation.is_group) {
      return `https://api.dicebear.com/7.x/identicon/svg?seed=${conversation.id}`
    }
    
    const otherParticipant = conversation.participants.find((p: any) => p.user_id !== currentUserId)
    return otherParticipant?.user.avatar_url || 
           `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherParticipant?.user.email}`
  }

  const getMessageStatus = (message: any) => {
    if (message.sender_id !== currentUserId) return null
    
    // For demo purposes, we'll show different statuses
    const now = new Date()
    const messageTime = new Date(message.created_at)
    const diffMinutes = (now.getTime() - messageTime.getTime()) / (1000 * 60)
    
    if (diffMinutes < 1) {
      return <Check className="w-4 h-4 text-whatsapp-gray" />
    } else if (diffMinutes < 5) {
      return <CheckCheck className="w-4 h-4 text-whatsapp-gray" />
    } else {
      return <CheckCheck className="w-4 h-4 text-blue-500" />
    }
  }

  if (filteredConversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-whatsapp-gray">
        <div className="text-center">
          <p className="text-lg mb-2">No conversations found</p>
          <p className="text-sm">Start a new chat from the Users tab</p>
        </div>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-700">
      {filteredConversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => handleConversationClick(conversation.id)}
          className={`p-4 hover-bg cursor-pointer transition-colors ${
            currentConversation?.id === conversation.id ? 'bg-whatsapp-message-bg' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={getConversationAvatar(conversation)}
                alt={getConversationName(conversation)}
                className="w-12 h-12 rounded-full"
              />
              {!conversation.is_group && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-whatsapp-sidebar-bg"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium truncate">
                  {getConversationName(conversation)}
                </h3>
                {conversation.last_message && (
                  <span className="text-whatsapp-gray text-xs">
                    {formatDistanceToNow(new Date(conversation.last_message.created_at), { addSuffix: true })}
                  </span>
                )}
              </div>
              
              {conversation.last_message && (
                <div className="flex items-center justify-between mt-1">
                  <p className="text-whatsapp-gray text-sm truncate flex-1">
                    {conversation.last_message.content}
                  </p>
                  <div className="ml-2 flex items-center space-x-1">
                    {getMessageStatus(conversation.last_message)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}