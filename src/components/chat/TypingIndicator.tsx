import { TypingUser } from '../../types'

interface TypingIndicatorProps {
  users: TypingUser[]
}

export default function TypingIndicator({ users }: TypingIndicatorProps) {
  if (users.length === 0) return null

  const getTypingText = () => {
    if (users.length === 1) {
      return `${users[0].user.full_name} is typing...`
    } else if (users.length === 2) {
      return `${users[0].user.full_name} and ${users[1].user.full_name} are typing...`
    } else {
      return `${users[0].user.full_name} and ${users.length - 1} others are typing...`
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <img
        src={users[0].user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${users[0].user.email}`}
        alt={users[0].user.full_name}
        className="w-8 h-8 rounded-full"
      />
      
      <div className="bg-whatsapp-message-bg text-white px-4 py-2 rounded-2xl rounded-bl-md shadow-lg">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-whatsapp-gray">{getTypingText()}</span>
          <div className="flex space-x-1 ml-2">
            <div className="w-2 h-2 bg-whatsapp-gray rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-whatsapp-gray rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-whatsapp-gray rounded-full typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  )
}