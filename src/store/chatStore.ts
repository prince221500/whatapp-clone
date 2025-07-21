import { create } from 'zustand'
import { Conversation, Message, User, TypingUser } from '../types'

interface ChatState {
  conversations: Conversation[]
  currentConversation: Conversation | null
  messages: Message[]
  users: User[]
  typingUsers: TypingUser[]
  searchQuery: string
  isLoading: boolean
  
  // Actions
  setConversations: (conversations: Conversation[]) => void
  setCurrentConversation: (conversation: Conversation | null) => void
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  updateMessage: (messageId: string, updates: Partial<Message>) => void
  setUsers: (users: User[]) => void
  setTypingUsers: (typingUsers: TypingUser[]) => void
  addTypingUser: (typingUser: TypingUser) => void
  removeTypingUser: (userId: string, conversationId: string) => void
  setSearchQuery: (query: string) => void
  setIsLoading: (loading: boolean) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  users: [],
  typingUsers: [],
  searchQuery: '',
  isLoading: false,

  setConversations: (conversations) => set({ conversations }),
  setCurrentConversation: (conversation) => set({ currentConversation: conversation }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => {
    const { messages } = get()
    set({ messages: [...messages, message] })
  },
  updateMessage: (messageId, updates) => {
    const { messages } = get()
    set({
      messages: messages.map(msg => 
        msg.id === messageId ? { ...msg, ...updates } : msg
      )
    })
  },
  setUsers: (users) => set({ users }),
  setTypingUsers: (typingUsers) => set({ typingUsers }),
  addTypingUser: (typingUser) => {
    const { typingUsers } = get()
    const exists = typingUsers.find(
      tu => tu.user_id === typingUser.user_id && tu.conversation_id === typingUser.conversation_id
    )
    if (!exists) {
      set({ typingUsers: [...typingUsers, typingUser] })
    }
  },
  removeTypingUser: (userId, conversationId) => {
    const { typingUsers } = get()
    set({
      typingUsers: typingUsers.filter(
        tu => !(tu.user_id === userId && tu.conversation_id === conversationId)
      )
    })
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}))