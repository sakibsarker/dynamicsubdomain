import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // If no dot in hostname, there's no subdomain (e.g., "localhost:3001")
  if (!hostname.includes('.')) {
    return NextResponse.next()
  }

  // Extract subdomain: "example1.localhost:3001" -> "example1"
  const subdomain = hostname.split('.')[0]

  // Pass subdomain to the app via request header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-subdomain', subdomain)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
