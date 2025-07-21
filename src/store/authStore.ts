import { create } from 'zustand'

interface User {
  id: string
  email: string
  user_metadata: {
    full_name: string
    avatar_url?: string
  }
}

interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'mock-user-1',
    email: 'user@example.com',
    user_metadata: {
      full_name: 'John Doe',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user@example.com'
    }
  },
  loading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}))