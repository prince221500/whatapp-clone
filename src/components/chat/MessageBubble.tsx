import { formatDistanceToNow, format } from 'date-fns'
import { Check, CheckCheck, Reply } from 'lucide-react'
import { Message } from '../../types'
import { useState } from 'react'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  showAvatar: boolean
  showTimestamp: boolean
}

export default function MessageBubble({ 
  message, 
  isOwn, 
  showAvatar, 
  showTimestamp 
}: MessageBubbleProps) {
  const [showFullTime, setShowFullTime] = useState(false)

  const getMessageStatus = () => {
    // For demo purposes, we'll show different statuses based on message age
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

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    if (showFullTime) {
      return format(date, 'MMM d, yyyy h:mm a')
    }
    return formatDistanceToNow(date, { addSuffix: true })
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} message-slide-in`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {showAvatar && !isOwn && (
          <img
            src={message.sender.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.sender.email}`}
            alt={message.sender.full_name}
            className="w-8 h-8 rounded-full"
          />
        )}
        
        <div className={`relative group ${showAvatar && !isOwn ? '' : 'ml-10'}`}>
          {/* Reply indicator */}
          {message.reply_message && (
            <div className={`mb-2 p-2 rounded-lg border-l-4 ${
              isOwn 
                ? 'bg-whatsapp-primary/20 border-whatsapp-primary' 
                : 'bg-gray-700 border-gray-500'
            }`}>
              <p className="text-xs text-whatsapp-gray font-medium">
                {message.reply_message.sender.full_name}
              </p>
              <p className="text-sm text-white/80 truncate">
                {message.reply_message.content}
              </p>
            </div>
          )}

          {/* Message bubble */}
          <div
            className={`relative px-4 py-2 rounded-2xl ${
              isOwn
                ? 'bg-whatsapp-primary text-white rounded-br-md'
                : 'bg-whatsapp-message-bg text-white rounded-bl-md'
            } shadow-lg`}
          >
            {/* Message content */}
            <div className="break-words">
              {message.content}
            </div>

            {/* Message info */}
            <div className={`flex items-center justify-end space-x-1 mt-1 ${
              isOwn ? 'text-white/70' : 'text-whatsapp-gray'
            }`}>
              {showTimestamp && (
                <span 
                  className="text-xs cursor-pointer"
                  onClick={() => setShowFullTime(!showFullTime)}
                >
                  {formatTime(message.created_at)}
                </span>
              )}
              {isOwn && showTimestamp && (
                <div className="message-status">
                  {getMessageStatus()}
                </div>
              )}
              {message.is_edited && (
                <span className="text-xs opacity-70">edited</span>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center space-x-1 bg-whatsapp-message-bg rounded-lg p-1 shadow-lg">
              <button className="p-1 text-whatsapp-gray hover:text-white transition-colors">
                <Reply className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}