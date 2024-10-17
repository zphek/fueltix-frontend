import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if(request.cookies.has("access-token")){
    console.log("Ta coronao.")
  }

  if (request.nextUrl.pathname.startsWith('/ticket') && request.cookies.has("access-token")) {
    console.log("XD")
    // return NextResponse.rewrite(new URL('/about-2', request.url))
  }

  // return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
}