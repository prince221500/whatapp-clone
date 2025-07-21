import { MessageCircle, Users, Shield, Zap } from 'lucide-react'

export default function Welcome() {
  return (
    <div className="flex-1 flex items-center justify-center bg-whatsapp-chat-bg">
      <div className="text-center max-w-md px-8">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-whatsapp-primary rounded-full mb-6">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to WhatsApp Clone
          </h1>
          <p className="text-whatsapp-gray text-lg leading-relaxed">
            Connect with friends and family through secure, real-time messaging.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="flex items-center space-x-4 p-4 bg-whatsapp-message-bg rounded-lg">
            <div className="flex-shrink-0">
              <Users className="w-8 h-8 text-whatsapp-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-white font-medium">Start Conversations</h3>
              <p className="text-whatsapp-gray text-sm">Find users and start chatting instantly</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-whatsapp-message-bg rounded-lg">
            <div className="flex-shrink-0">
              <Zap className="w-8 h-8 text-whatsapp-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-white font-medium">Real-time Messaging</h3>
              <p className="text-whatsapp-gray text-sm">Messages delivered instantly with read receipts</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-whatsapp-message-bg rounded-lg">
            <div className="flex-shrink-0">
              <Shield className="w-8 h-8 text-whatsapp-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-white font-medium">Secure & Private</h3>
              <p className="text-whatsapp-gray text-sm">Your conversations are protected and private</p>
            </div>
          </div>
        </div>

        <div className="text-whatsapp-gray">
          <p className="text-sm">
            Select a conversation from the sidebar to start messaging, or go to the Users tab to find people to chat with.
          </p>
        </div>
      </div>
    </div>
  )
}