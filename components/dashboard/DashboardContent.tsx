'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, Calendar, DollarSign, AlertCircle, MapPin, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const MOCK_KPI = {
  totalShows: 18,
  totalCache: 312000,
  showsConfirmados: 11,
  recebivelAtrasado: 28500,
  showsMes: 6,
  cacheMedia: 17333,
}

const MOCK_REVENUE = [
  { mes: 'Nov', valor: 48000 },
  { mes: 'Dez', valor: 95000 },
  { mes: 'Jan', valor: 62000 },
  { mes: 'Fev', valor: 78000 },
  { mes: 'Mar', valor: 110000 },
  { mes: 'Abr', valor: 89000 },
]

const MOCK_NEXT_SHOWS = [
  { id: '1', title: 'Forró Festival Nordeste', city: 'Fortaleza', state: 'CE', status: 'confirmado', cache_value: 18000, start_at: '2025-04-26T22:00:00', artist: 'Banda Vibração' },
  { id: '2', title: 'Festa Junina Recife', city: 'Recife', state: 'PE', status: 'contrato_assinado', cache_value: 22000, start_at: '2025-04-29T21:00:00', artist: 'Trio do Piseiro' },
  { id: '3', title: 'Show VIP São Paulo', city: 'São Paulo', state: 'SP', status: 'contrato_enviado', cache_value: 35000, start_at: '2025-05-03T20:00:00', artist: 'Banda Vibração' },
  { id: '4', title: 'Festival de Verão', city: 'Salvador', state: 'BA', status: 'pre_reserva', cache_value: 15000, start_at: '2025-05-10T22:30:00', artist: 'Trio do Piseiro' },
  { id: '5', title: 'Arena Shows Manaus', city: 'Manaus', state: 'AM', status: 'confirmado', cache_value: 28000, start_at: '2025-05-17T21:00:00', artist: 'Banda Vibração' },
]

const STATUS_LABELS: Record<string, string> = {
  pre_reserva: 'Pré-reserva',
  confirmado: 'Confirmado',
  contrato_enviado: 'Contrato Enviado',
  contrato_assinado: 'Assinado',
  realizado: 'Realizado',
  cancelado: 'Cancelado',
}

const STATUS_COLORS: Record<string, string> = {
  pre_reserva: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20',
  confirmado: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  contrato_enviado: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  contrato_assinado: 'bg-emerald-600/15 text-emerald-300 border-emerald-600/20',
  realizado: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  cancelado: 'bg-red-500/15 text-red-400 border-red-500/20',
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg border bg-card px-3 py-2 shadow-md">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-violet-400">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export function DashboardContent() {
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

  return (
    <div className="space-y-6">
      {isDemo && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 flex items-center gap-3">
          <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
          <p className="text-sm text-amber-300">
            <span className="font-semibold">Modo demonstração</span> — dados fictícios para visualização. Conecte o Supabase para usar de verdade.
          </p>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Shows do Mês</p>
                <p className="text-3xl font-bold mt-1">{MOCK_KPI.showsMes}</p>
                <p className="text-xs text-muted-foreground mt-1">{MOCK_KPI.totalShows} no total</p>
              </div>
              <div className="rounded-lg bg-violet-500/10 p-2">
                <Calendar className="h-5 w-5 text-violet-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Cachê Total</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(MOCK_KPI.totalCache)}</p>
                <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> +12% vs mês anterior
                </p>
              </div>
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <DollarSign className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Confirmados</p>
                <p className="text-3xl font-bold mt-1">{MOCK_KPI.showsConfirmados}</p>
                <p className="text-xs text-muted-foreground mt-1">de {MOCK_KPI.totalShows} shows</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">A Receber Atrasado</p>
                <p className="text-2xl font-bold mt-1 text-red-400">{formatCurrency(MOCK_KPI.recebivelAtrasado)}</p>
                <p className="text-xs text-red-400 mt-1">2 parcelas vencidas</p>
              </div>
              <div className="rounded-lg bg-red-500/10 p-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Receita dos Últimos 6 Meses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MOCK_REVENUE} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', radius: 4 }} />
              <Bar dataKey="valor" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Next Shows */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Próximos Shows</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {MOCK_NEXT_SHOWS.map((show) => (
              <div key={show.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="w-12 text-center shrink-0">
                  <div className="text-lg font-bold leading-none">
                    {format(parseISO(show.start_at), 'd', { locale: ptBR })}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase">
                    {format(parseISO(show.start_at), 'MMM', { locale: ptBR })}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{show.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {show.city}, {show.state}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {format(parseISO(show.start_at), 'HH:mm')}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-sm font-semibold text-emerald-400">{formatCurrency(show.cache_value)}</span>
                  <span className={cn('rounded-full border px-2 py-0.5 text-xs font-medium', STATUS_COLORS[show.status])}>
                    {STATUS_LABELS[show.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
