import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  //token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl

  //allow th request if the following is true...
  // - its a request for the next-auth session & provider fetching
  // - the token exist

  // if (token && pathname === '/login') {
  //   const url = req.nextUrl.clone()
  //   url.pathname = '/'
  //   return NextResponse.redirect(url)
  // }
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  //redirect to login if no token & requesting protected routes
  if (!token && pathname !== '/login') {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}
