'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Users, Building2, Handshake, DollarSign, BarChart3, Settings, LogOut, ChevronLeft, Music2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/stores/ui'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/agenda', icon: Calendar, label: 'Agenda' },
  { href: '/artistas', icon: Music2, label: 'Artistas' },
  { href: '/contratantes', icon: Building2, label: 'Contratantes' },
  { href: '/parceiros', icon: Handshake, label: 'Parceiros' },
  { href: '/financeiro', icon: DollarSign, label: 'Financeiro' },
  { href: '/relatorios', icon: BarChart3, label: 'Relatórios' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <aside className={cn(
      'hidden lg:flex flex-col border-r border-border/50 bg-card transition-all duration-300',
      sidebarOpen ? 'w-56' : 'w-16'
    )}>
      {/* Logo */}
      <div className={cn('flex h-14 items-center border-b border-border/50 px-4 gap-3', !sidebarOpen && 'justify-center px-0')}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        {sidebarOpen && <span className="font-bold text-base">ShowDeck</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-violet-600/15 text-violet-400 font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                !sidebarOpen && 'justify-center px-0'
              )}
              title={!sidebarOpen ? label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border/50 p-2 space-y-1">
        <Link
          href="/configuracoes"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors',
            !sidebarOpen && 'justify-center px-0'
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {sidebarOpen && 'Configurações'}
        </Link>
        <button
          onClick={toggleSidebar}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors',
            !sidebarOpen && 'justify-center px-0'
          )}
        >
          <ChevronLeft className={cn('h-4 w-4 shrink-0 transition-transform', !sidebarOpen && 'rotate-180')} />
          {sidebarOpen && 'Recolher'}
        </button>
      </div>
    </aside>
  )
}
