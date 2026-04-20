import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Session } from '@supabase/supabase-js'

interface Organization {
  id: string
  name: string
  plan: string
  owner_id: string
}

interface AuthState {
  user: User | null
  session: Session | null
  organization: Organization | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setOrganization: (org: Organization | null) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      organization: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setOrganization: (organization) => set({ organization }),
      setLoading: (isLoading) => set({ isLoading }),
      reset: () => set({ user: null, session: null, organization: null, isLoading: false }),
    }),
    {
      name: 'showdeck-auth',
      partialize: (state) => ({ organization: state.organization }),
    }
  )
)
