import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    const auth = request.cookies.get('auth')
    const role = request.cookies.get('role')

    if(request.nextUrl.pathname.startsWith('/dashboard') && !auth ){
        console.log('Un-authorized')
        return NextResponse.redirect(new URL('/login',request.url))
    }
    return NextResponse.next()
}