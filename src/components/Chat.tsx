import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './chat/Sidebar'
import ChatWindow from './chat/ChatWindow'
import StatusView from './chat/StatusView'
import Welcome from './chat/Welcome'
import { useChatStore } from '../store/chatStore'

export default function Chat() {
  const { 
    setConversations, 
    setUsers
  } = useChatStore()

  useEffect(() => {
    // Load mock data instead of Supabase data
    loadMockConversations()
    loadMockUsers()
  }, [])

  const loadMockConversations = () => {
    const mockConversations = [
      {
        id: '1',
        name: null,
        is_group: false,
        created_by: 'user1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_message_at: new Date().toISOString(),
        participants: [
          {
            id: '1',
            conversation_id: '1',
            user_id: 'user1',
            joined_at: new Date().toISOString(),
            is_admin: false,
            user: {
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
        ],
        last_message: {
          id: '1',
          conversation_id: '1',
          sender_id: 'user1',
          content: 'Hello! How are you?',
          message_type: 'text' as const,
          file_url: null,
          reply_to: null,
          is_edited: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
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
      },
      {
        id: '2',
        name: null,
        is_group: false,
        created_by: 'user2',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_message_at: new Date().toISOString(),
        participants: [
          {
            id: '2',
            conversation_id: '2',
            user_id: 'user2',
            joined_at: new Date().toISOString(),
            is_admin: false,
            user: {
              id: 'user2',
              email: 'jane@example.com',
              full_name: 'Jane Smith',
              avatar_url: null,
              status: 'Busy',
              last_seen: new Date().toISOString(),
              is_online: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          }
        ],
        last_message: {
          id: '2',
          conversation_id: '2',
          sender_id: 'user2',
          content: 'See you tomorrow!',
          message_type: 'text' as const,
          file_url: null,
          reply_to: null,
          is_edited: false,
          created_at: new Date(Date.now() - 60000).toISOString(),
          updated_at: new Date(Date.now() - 60000).toISOString(),
          sender: {
            id: 'user2',
            email: 'jane@example.com',
            full_name: 'Jane Smith',
            avatar_url: null,
            status: 'Busy',
            last_seen: new Date().toISOString(),
            is_online: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        }
      }
    ]

    setConversations(mockConversations)
  }

  const loadMockUsers = () => {
    const mockUsers = [
      {
        id: 'user1',
        email: 'john@example.com',
        full_name: 'John Doe',
        avatar_url: null,
        status: 'Hey there! I am using WhatsApp.',
        last_seen: new Date().toISOString(),
        is_online: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user2',
        email: 'jane@example.com',
        full_name: 'Jane Smith',
        avatar_url: null,
        status: 'Busy',
        last_seen: new Date().toISOString(),
        is_online: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user3',
        email: 'mike@example.com',
        full_name: 'Mike Johnson',
        avatar_url: null,
        status: 'Available',
        last_seen: new Date().toISOString(),
        is_online: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user4',
        email: 'sarah@example.com',
        full_name: 'Sarah Wilson',
        avatar_url: null,
        status: 'At work',
        last_seen: new Date(Date.now() - 300000).toISOString(),
        is_online: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user5',
        email: 'alex@example.com',
        full_name: 'Alex Brown',
        avatar_url: null,
        status: 'Sleeping 😴',
        last_seen: new Date(Date.now() - 28800000).toISOString(),
        is_online: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user6',
        email: 'emma@example.com',
        full_name: 'Emma Davis',
        avatar_url: null,
        status: 'Coffee time ☕',
        last_seen: new Date().toISOString(),
        is_online: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user7',
        email: 'david@example.com',
        full_name: 'David Miller',
        avatar_url: null,
        status: 'In a meeting',
        last_seen: new Date(Date.now() - 1800000).toISOString(),
        is_online: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user8',
        email: 'lisa@example.com',
        full_name: 'Lisa Garcia',
        avatar_url: null,
        status: 'Traveling ✈️',
        last_seen: new Date(Date.now() - 7200000).toISOString(),
        is_online: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user9',
        email: 'tom@example.com',
        full_name: 'Tom Anderson',
        avatar_url: null,
        status: 'Coding 💻',
        last_seen: new Date().toISOString(),
        is_online: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user10',
        email: 'maria@example.com',
        full_name: 'Maria Rodriguez',
        avatar_url: null,
        status: 'Gym time 💪',
        last_seen: new Date(Date.now() - 3600000).toISOString(),
        is_online: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]

    setUsers(mockUsers)
  }

  return (
    <div className="flex h-screen bg-whatsapp-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/chat/:conversationId" element={<ChatWindow />} />
          <Route path="/status" element={<StatusView />} />
        </Routes>
      </div>
    </div>
  )
}