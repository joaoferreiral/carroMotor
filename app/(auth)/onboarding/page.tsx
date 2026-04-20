'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const orgSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
})
type OrgFormData = z.infer<typeof orgSchema>

const artistSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
})
type ArtistFormData = z.infer<typeof artistSchema>

const PLANS = [
  { id: 'trial', name: 'Trial', price: 'Grátis', period: '7 dias', features: ['Até 20 shows', '2 artistas', 'Suporte por e-mail'], highlight: false },
  { id: 'starter', name: 'Starter', price: 'R$ 97', period: '/mês', features: ['Shows ilimitados', '5 artistas', 'Suporte via WhatsApp', 'Exportação PDF'], highlight: true },
  { id: 'pro', name: 'Pro', price: 'R$ 197', period: '/mês', features: ['Tudo do Starter', 'Artistas ilimitados', 'Relatórios avançados', 'API access', 'Suporte prioritário'], highlight: false },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('trial')
  const [loading, setLoading] = useState(false)
  const [orgId, setOrgId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const orgForm = useForm<OrgFormData>({ resolver: zodResolver(orgSchema) })
  const artistForm = useForm<ArtistFormData>({ resolver: zodResolver(artistSchema) })

  const createOrg = async (data: OrgFormData) => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data: org, error } = await supabase
      .from('organizations')
      .insert({ name: data.name, plan: selectedPlan, owner_id: user.id })
      .select()
      .single()

    if (!error && org) {
      await supabase.from('organization_members').insert({
        org_id: org.id, user_id: user.id, role: 'owner',
        permissions: { all: true },
      })
      setOrgId(org.id)
      setStep(3)
    }
    setLoading(false)
  }

  const createArtist = async (data: ArtistFormData) => {
    setLoading(true)
    if (orgId) {
      await supabase.from('artists').insert({ org_id: orgId, name: data.name, active: true })
    }
    setLoading(false)
    setStep(4)
  }

  const steps = [
    { number: 1, label: 'Organização' },
    { number: 2, label: 'Plano' },
    { number: 3, label: 'Artista' },
    { number: 4, label: 'Pronto' },
  ]

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.number} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
              step > s.number ? 'bg-violet-600 text-white' :
              step === s.number ? 'bg-violet-600 text-white' :
              'bg-muted text-muted-foreground'
            }`}>
              {step > s.number ? '✓' : s.number}
            </div>
            <span className={`text-xs hidden sm:block ${step === s.number ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {s.label}
            </span>
            {i < steps.length - 1 && <div className={`h-px flex-1 ${step > s.number ? 'bg-violet-600' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 — Org name */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Bem-vindo ao ShowDeck! 🎵</h1>
            <p className="mt-1 text-sm text-muted-foreground">Vamos criar sua empresa/organização em menos de 1 minuto.</p>
          </div>
          <form onSubmit={orgForm.handleSubmit(() => setStep(2))} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome da sua empresa ou artista</Label>
              <Input placeholder="Ex: Assessoria João Gomes, Banda do Piseiro..." {...orgForm.register('name')} />
              {orgForm.formState.errors.name && (
                <p className="text-xs text-destructive">{orgForm.formState.errors.name.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full h-11 bg-violet-600 hover:bg-violet-700">
              Continuar
            </Button>
          </form>
        </div>
      )}

      {/* Step 2 — Plan */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Escolha seu plano</h2>
            <p className="mt-1 text-sm text-muted-foreground">Comece grátis, sem precisar de cartão.</p>
          </div>
          <div className="space-y-3">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                  selectedPlan === plan.id ? 'border-violet-600 bg-violet-500/5' : 'border-border hover:border-violet-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{plan.name}</span>
                      {plan.highlight && <span className="rounded-full bg-violet-600 px-2 py-0.5 text-xs text-white">Popular</span>}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {plan.features.slice(0, 2).map((f) => (
                        <span key={f} className="text-xs text-muted-foreground">• {f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{plan.price}</span>
                    <span className="text-xs text-muted-foreground block">{plan.period}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <Button onClick={() => orgForm.handleSubmit(createOrg)()} className="w-full h-11 bg-violet-600 hover:bg-violet-700" disabled={loading}>
            {loading ? 'Criando...' : 'Confirmar plano'}
          </Button>
        </div>
      )}

      {/* Step 3 — First artist */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Adicione seu primeiro artista</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pode pular e adicionar depois se quiser.</p>
          </div>
          <form onSubmit={artistForm.handleSubmit(createArtist)} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome do artista</Label>
              <Input placeholder="Ex: João Gomes, Banda Calcinha Preta..." {...artistForm.register('name')} />
            </div>
            <Button type="submit" className="w-full h-11 bg-violet-600 hover:bg-violet-700" disabled={loading}>
              {loading ? 'Salvando...' : 'Adicionar artista'}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(4)}>
              Pular por agora
            </Button>
          </form>
        </div>
      )}

      {/* Step 4 — Done */}
      {step === 4 && (
        <div className="space-y-6 text-center">
          <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-emerald-500/10">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Tudo pronto! 🎉</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sua conta está configurada. Agora é só começar a gerenciar seus shows.
            </p>
          </div>
          <Button className="w-full h-11 bg-violet-600 hover:bg-violet-700" onClick={() => router.push('/dashboard')}>
            Ir para o Dashboard
          </Button>
        </div>
      )}
    </div>
  )
}
