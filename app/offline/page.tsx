import Link from 'next/link'

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-600">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Sem conexão</h1>
        <p className="mt-2 text-muted-foreground">
          Você está offline. Os dados salvos continuam disponíveis.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="rounded-lg bg-violet-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
      >
        Tentar novamente
      </Link>
    </div>
  )
}
