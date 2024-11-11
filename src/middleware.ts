import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {checkToken} from "@/lib/auth";

import {AUTH_LOGIN_URL, AUTH_REFRESH_TOKEN, AUTH_TOKEN_COOKIE} from "./lib/constants";

export default function middleware(request: NextRequest) {
    const token = request.cookies.get(AUTH_TOKEN_COOKIE as any);
    const isValid = checkToken(token?.value.toString());
    if (!isValid) {
        request.cookies.delete(AUTH_TOKEN_COOKIE);
        request.cookies.delete(AUTH_REFRESH_TOKEN);
        const url = request.nextUrl.clone()
        url.searchParams.set('next-url', request.nextUrl.pathname);
        url.pathname = AUTH_LOGIN_URL;
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}


export const config = {
    matcher: [
        // "/((?!api|_next/static|_next/image|favicon.ico).*)",

        '/dashboard:path*',
        // "/profile"
    ],
}
