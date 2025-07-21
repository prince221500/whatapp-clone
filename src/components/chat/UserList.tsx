import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChatStore } from '../../store/chatStore'
import { useAuthStore } from '../../store/authStore'
import { supabase } from '../../lib/supabase'
import { toast } from 'react-hot-toast'
import { MessageCircle, Users } from 'lucide-react'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function UserList() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { users, searchQuery, conversations } = useChatStore()
  const [loading, setLoading] = useState<string | null>(null)

  const filteredUsers = users.filter(u => 
    u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startConversation = async (otherUserId: string) => {
    if (!user) return
    
    setLoading(otherUserId)
    
    try {
      // Check if conversation already exists
      const existingConversation = conversations.find(conv => 
        !conv.is_group && 
        conv.participants.some(p => p.user_id === otherUserId) &&
        conv.participants.some(p => p.user_id === user.id)
      )

      if (existingConversation) {
        navigate(`/chat/${existingConversation.id}`)
        return
      }

      // Create new conversation
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert({
          is_group: false,
          created_by: user.id,
        })
        .select()
        .single()

      if (convError) throw convError

      // Add participants
      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert([
          {
            conversation_id: conversation.id,
            user_id: user.id,
            is_admin: true,
          },
          {
            conversation_id: conversation.id,
            user_id: otherUserId,
            is_admin: false,
          },
        ])

      if (participantsError) throw participantsError

      navigate(`/chat/${conversation.id}`)
      toast.success('Conversation started!')
    } catch (error) {
      console.error('Error starting conversation:', error)
      toast.error('Failed to start conversation')
    } finally {
      setLoading(null)
    }
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-whatsapp-gray">
        <Users className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg mb-2">No users found</p>
        <p className="text-sm text-center">
          {searchQuery ? 'Try a different search term' : 'No other users available'}
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-700">
      {filteredUsers.map((otherUser) => (
        <div
          key={otherUser.id}
          onClick={() => startConversation(otherUser.id)}
          className="p-4 hover-bg cursor-pointer transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={otherUser.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUser.email}`}
                alt={otherUser.full_name}
                className="w-12 h-12 rounded-full"
              />
              {otherUser.is_online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-whatsapp-sidebar-bg online-pulse"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium truncate">
                  {otherUser.full_name}
                </h3>
                {loading === otherUser.id ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <MessageCircle className="w-5 h-5 text-whatsapp-gray" />
                )}
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <p className="text-whatsapp-gray text-sm truncate">
                  {otherUser.status}
                </p>
                <span className="text-xs text-whatsapp-gray">
                  {otherUser.is_online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}