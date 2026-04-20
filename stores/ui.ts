import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  commandOpen: boolean
  setCommandOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      commandOpen: false,
      setCommandOpen: (commandOpen) => set({ commandOpen }),
    }),
    { name: 'showdeck-ui', partialize: (state) => ({ sidebarOpen: state.sidebarOpen, theme: state.theme }) }
  )
)
