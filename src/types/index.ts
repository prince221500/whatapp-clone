export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  status: string
  last_seen: string
  is_online: boolean
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  name?: string
  is_group: boolean
  created_by: string
  created_at: string
  updated_at: string
  last_message_at?: string
  participants: ConversationParticipant[]
  last_message?: Message
  unread_count?: number
}

export interface ConversationParticipant {
  id: string
  conversation_id: string
  user_id: string
  joined_at: string
  is_admin: boolean
  user: User
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  message_type: 'text' | 'image' | 'file' | 'audio'
  file_url?: string
  reply_to?: string
  is_edited: boolean
  created_at: string
  updated_at: string
  sender: User
  reply_message?: Message
  status?: MessageStatus[]
}

export interface MessageStatus {
  id: string
  message_id: string
  user_id: string
  status: 'sent' | 'delivered' | 'read'
  timestamp: string
}

export interface TypingUser {
  user_id: string
  conversation_id: string
  user: User
}