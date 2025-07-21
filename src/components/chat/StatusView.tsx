import { ArrowLeft, MoreVertical, Heart, MessageCircle, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function StatusView() {
  const navigate = useNavigate()
  const [currentStatus, setCurrentStatus] = useState(0)
  const [replyText, setReplyText] = useState('')

  const statuses = [
    {
      id: '1',
      user: {
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
      },
      content: 'Having a great day! 🌟',
      timestamp: '2 hours ago',
      type: 'text',
      backgroundColor: '#00a884'
    },
    {
      id: '2',
      user: {
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
      },
      content: 'Beautiful sunset today 🌅',
      timestamp: '4 hours ago',
      type: 'text',
      backgroundColor: '#ff6b6b'
    }
  ]

  const handleNext = () => {
    if (currentStatus < statuses.length - 1) {
      setCurrentStatus(currentStatus + 1)
    } else {
      navigate('/')
    }
  }

  const handlePrevious = () => {
    if (currentStatus > 0) {
      setCurrentStatus(currentStatus - 1)
    } else {
      navigate('/')
    }
  }

  const handleReply = () => {
    if (replyText.trim()) {
      // Handle reply logic here
      setReplyText('')
    }
  }

  const status = statuses[currentStatus]

  return (
    <div className="flex-1 flex flex-col bg-black relative">
      {/* Status Progress Bars */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="flex space-x-1">
          {statuses.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  index < currentStatus ? 'w-full' : index === currentStatus ? 'w-1/2' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-6 left-0 right-0 z-10 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-black/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img
              src={status.user.avatar}
              alt={status.user.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h3 className="font-medium">{status.user.name}</h3>
              <p className="text-sm text-gray-300">{status.timestamp}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-black/20 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Status Content */}
      <div
        className="flex-1 flex items-center justify-center p-8 cursor-pointer"
        style={{ backgroundColor: status.backgroundColor }}
        onClick={handleNext}
      >
        <div className="text-center">
          <p className="text-white text-2xl font-medium leading-relaxed">
            {status.content}
          </p>
        </div>
      </div>

      {/* Navigation Areas */}
      <div className="absolute inset-0 flex">
        <div
          className="flex-1 cursor-pointer"
          onClick={handlePrevious}
        />
        <div
          className="flex-1 cursor-pointer"
          onClick={handleNext}
        />
      </div>

      {/* Reply Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center space-x-3">
          <button className="p-3 text-white hover:bg-white/10 rounded-full transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          
          <div className="flex-1 flex items-center bg-white/10 rounded-full">
            <input
              type="text"
              placeholder="Reply to status..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-300 px-4 py-2 outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleReply()}
            />
            <button
              onClick={handleReply}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors mr-1"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}