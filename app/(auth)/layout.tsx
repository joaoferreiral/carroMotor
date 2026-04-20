export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-violet-950 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-violet-950 to-zinc-950" />
        <div className="relative z-10 max-w-md text-center">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">ShowDeck</span>
          </div>
          <h2 className="text-2xl font-semibold text-white leading-tight">
            Gerencie sua carreira<br />com inteligência
          </h2>
          <p className="mt-4 text-violet-200 text-sm leading-relaxed">
            Agenda, cachês, contratantes e equipe — tudo em um único lugar. Para empresários, artistas e agências de booking.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { value: '2.400+', label: 'Shows gerenciados' },
              { value: 'R$12M+', label: 'Em cachês' },
              { value: '380+', label: 'Artistas' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 p-4">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-violet-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 lg:p-12 bg-background">
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <span className="text-xl font-bold">ShowDeck</span>
        </div>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
