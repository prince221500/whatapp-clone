import { useState } from 'react'
import { X, Camera, Save } from 'lucide-react'
import { toast } from 'react-hot-toast'
import LoadingSpinner from '../ui/LoadingSpinner'

interface ProfileModalProps {
  onClose: () => void
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
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

  const [fullName, setFullName] = useState(mockUser.full_name)
  const [status, setStatus] = useState(mockUser.status)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    
    // Simulate saving
    setTimeout(() => {
      toast.success('Profile updated successfully!')
      setLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-whatsapp-message-bg rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Profile</h2>
          <button
            onClick={onClose}
            className="p-2 text-whatsapp-gray hover:text-white hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mockUser.email}`}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-whatsapp-primary text-white rounded-full hover:bg-whatsapp-secondary transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-whatsapp-gray text-sm">Click to change profile photo</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-whatsapp-gray mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-whatsapp-dark border border-gray-600 rounded-lg text-white placeholder-whatsapp-gray focus:outline-none focus:border-whatsapp-primary transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-whatsapp-gray mb-2">
                Status
              </label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-whatsapp-dark border border-gray-600 rounded-lg text-white placeholder-whatsapp-gray focus:outline-none focus:border-whatsapp-primary transition-colors"
                placeholder="Enter your status"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-whatsapp-gray mb-2">
                Email
              </label>
              <input
                type="email"
                value={mockUser.email}
                disabled
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-whatsapp-gray cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-whatsapp-gray hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-whatsapp-primary hover:bg-whatsapp-secondary text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}