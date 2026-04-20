'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Plus, DollarSign, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Início' },
  { href: '/agenda', icon: Calendar, label: 'Agenda' },
  { href: '/agenda?action=new', icon: Plus, label: 'Novo', isFab: true },
  { href: '/financeiro', icon: DollarSign, label: 'Financeiro' },
  { href: '/mais', icon: MoreHorizontal, label: 'Mais' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center border-t border-border/50 bg-card/95 backdrop-blur lg:hidden">
      {NAV_ITEMS.map(({ href, icon: Icon, label, isFab }) => {
        const active = pathname === href || (href !== '/' && pathname.startsWith(href.split('?')[0] + '/'))
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors',
              isFab ? '' : active ? 'text-violet-400' : 'text-muted-foreground'
            )}
          >
            {isFab ? (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 shadow-lg shadow-violet-500/25">
                <Icon className="h-5 w-5 text-white" />
              </div>
            ) : (
              <>
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
