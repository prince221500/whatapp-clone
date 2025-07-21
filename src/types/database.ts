export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          status: string
          last_seen: string
          is_online: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          status?: string
          last_seen?: string
          is_online?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          status?: string
          last_seen?: string
          is_online?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          name: string | null
          is_group: boolean
          created_by: string
          created_at: string
          updated_at: string
          last_message_at: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          is_group?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
          last_message_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          is_group?: boolean
          created_by?: string
          created_at?: string
          updated_at?: string
          last_message_at?: string | null
        }
      }
      conversation_participants: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          joined_at: string
          is_admin: boolean
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          joined_at?: string
          is_admin?: boolean
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          joined_at?: string
          is_admin?: boolean
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          message_type: 'text' | 'image' | 'file' | 'audio'
          file_url: string | null
          reply_to: string | null
          is_edited: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          message_type?: 'text' | 'image' | 'file' | 'audio'
          file_url?: string | null
          reply_to?: string | null
          is_edited?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          message_type?: 'text' | 'image' | 'file' | 'audio'
          file_url?: string | null
          reply_to?: string | null
          is_edited?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      message_status: {
        Row: {
          id: string
          message_id: string
          user_id: string
          status: 'sent' | 'delivered' | 'read'
          timestamp: string
        }
        Insert: {
          id?: string
          message_id: string
          user_id: string
          status: 'sent' | 'delivered' | 'read'
          timestamp?: string
        }
        Update: {
          id?: string
          message_id?: string
          user_id?: string
          status?: 'sent' | 'delivered' | 'read'
          timestamp?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}