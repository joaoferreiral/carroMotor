import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
    const url = request.nextUrl.clone()
    // In demo mode redirect auth routes straight to the app
    const isAuthRoute = url.pathname.startsWith('/login') ||
                        url.pathname.startsWith('/signup') ||
                        url.pathname.startsWith('/onboarding') ||
                        url.pathname.startsWith('/auth')
    if (isAuthRoute) {
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
    return NextResponse.next({ request })
  }
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|manifest.json|sw.js|workbox-.*\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
