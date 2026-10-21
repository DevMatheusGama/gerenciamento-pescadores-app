import { NextRequest, NextResponse } from "next/server"; 

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value
    const pathname = request.nextUrl.pathname

    const privateRoutes = ['/cadastrar', '/pescador']
    const isPrivateRoute = privateRoutes.some(
        (route) => 
            pathname === route || pathname.startsWith(`${route}/`)
    )

    if (!token && isPrivateRoute) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (token && pathname === '/') {
        return NextResponse.redirect(new URL('/pescador', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
