import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useChatStore } from '../../store/chatStore'
import { Message, Conversation } from '../../types'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function ChatWindow() {
  const { conversationId } = useParams<{ conversationId: string }>()
  const { 
    currentConversation, 
    setCurrentConversation, 
    messages, 
    setMessages,
    addMessage,
    isLoading,
    setIsLoading,
    conversations
  } = useChatStore()
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUserId = 'current-user'

  useEffect(() => {
    if (conversationId) {
      loadConversation()
      loadMessages()
    }

    return () => {
      setCurrentConversation(null)
      setMessages([])
    }
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadConversation = () => {
    if (!conversationId) return

    setIsLoading(true)
    
    const conversation = conversations.find(c => c.id === conversationId)
    
    if (conversation) {
      setCurrentConversation(conversation)
    }
    
    setIsLoading(false)
  }

  const loadMessages = () => {
    if (!conversationId) return

    // Mock messages for the conversation
    const mockMessages: Message[] = [
      {
        id: '1',
        conversation_id: conversationId,
        sender_id: 'user1',
        content: 'Hello! How are you?',
        message_type: 'text',
        file_url: null,
        reply_to: null,
        is_edited: false,
        created_at: new Date(Date.now() - 120000).toISOString(),
        updated_at: new Date(Date.now() - 120000).toISOString(),
        sender: {
          id: 'user1',
          email: 'john@example.com',
          full_name: 'John Doe',
          avatar_url: null,
          status: 'Hey there! I am using WhatsApp.',
          last_seen: new Date().toISOString(),
          is_online: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      },
      {
        id: '2',
        conversation_id: conversationId,
        sender_id: currentUserId,
        content: 'Hi! I\'m doing great, thanks for asking!',
        message_type: 'text',
        file_url: null,
        reply_to: null,
        is_edited: false,
        created_at: new Date(Date.now() - 60000).toISOString(),
        updated_at: new Date(Date.now() - 60000).toISOString(),
        sender: {
          id: currentUserId,
          email: 'you@example.com',
          full_name: 'You',
          avatar_url: null,
          status: 'Hey there! I am using WhatsApp.',
          last_seen: new Date().toISOString(),
          is_online: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      },
      {
        id: '3',
        conversation_id: conversationId,
        sender_id: 'user1',
        content: 'That\'s wonderful to hear! What are you up to today?',
        message_type: 'text',
        file_url: null,
        reply_to: null,
        is_edited: false,
        created_at: new Date(Date.now() - 30000).toISOString(),
        updated_at: new Date(Date.now() - 30000).toISOString(),
        sender: {
          id: 'user1',
          email: 'john@example.com',
          full_name: 'John Doe',
          avatar_url: null,
          status: 'Hey there! I am using WhatsApp.',
          last_seen: new Date().toISOString(),
          is_online: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      }
    ]

    setMessages(mockMessages)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async (content: string, replyTo?: string) => {
    if (!conversationId || !content.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      conversation_id: conversationId,
      sender_id: currentUserId,
      content: content.trim(),
      message_type: 'text',
      file_url: null,
      reply_to: replyTo || null,
      is_edited: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sender: {
        id: currentUserId,
        email: 'you@example.com',
        full_name: 'You',
        avatar_url: null,
        status: 'Hey there! I am using WhatsApp.',
        last_seen: new Date().toISOString(),
        is_online: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }

    addMessage(newMessage)
  }

  const handleTyping = () => {
    // Mock typing functionality
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-whatsapp-chat-bg">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!currentConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-whatsapp-chat-bg">
        <div className="text-center text-whatsapp-gray">
          <p className="text-lg">Conversation not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-whatsapp-chat-bg">
      <ChatHeader conversation={currentConversation} />
      
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={messages} 
          currentUserId={currentUserId} 
        />
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput 
        onSendMessage={sendMessage}
        onTyping={handleTyping}
      />
    </div>
  )
}