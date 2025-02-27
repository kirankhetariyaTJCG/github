// Next Imports
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Helper Imports
import AppUtils from './Helper/AppUtils'
import Constants from '@/Helper/Constants'

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const routes = ['/login', '/register', '/forgot-password', '/not-authorized', '/images', '/sdk', '/website-editor', '/videos', '/api']

  if (routes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const loggedIn = request.cookies.get(`${Constants.LOCAL_STORAGE_PREFIX}.${Constants.LOGGED_IN}`)?.value
  const permissions = (() => {
    try {
      return JSON.parse(request.cookies.get(`${Constants.LOCAL_STORAGE_PREFIX}.${Constants.PERMISSIONS}`)?.value || '[]')
    } catch {
      console.error('Invalid permissions cookie')
      return []
    }
  })()

  const protectedRoutes = ['/setup', '/marketing-tools', '/reports', '/profile', '/online-ordering']

  if (AppUtils.checkValue(loggedIn) && routes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/setup/restaurant/details', request.url))
  }

  if (!AppUtils.checkValue(loggedIn) && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!AppUtils.hasPermission(permissions, pathname)) {
    return NextResponse.redirect(new URL('/not-authorized', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|static|_next|favicon.ico|public).*)']
}
