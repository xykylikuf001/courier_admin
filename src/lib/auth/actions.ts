"use server"
import jwtDecode from "jwt-decode";

import {cookies} from "next/headers";
import { redirect, RedirectType } from 'next/navigation'
import {
    AUTH_TOKEN_COOKIE,
    AUTH_REFRESH_TOKEN,
    COOKIE_PATH, COOKIE_ENABLE_SECURE,
    COOKIE_SAME_SITE, AUTH_LOGOUT_REDIRECT, AUTH_LOGOUT_URL
} from "@/lib/constants";
import {checkToken} from "@/lib/auth/index";


export const navigateToLogout = async ()=>{
    redirect(AUTH_LOGOUT_URL, RedirectType.replace)
}

export const destroyAuthCookies = async  (redirectRequire: boolean=true): Promise<void> => {
    cookies().delete(AUTH_TOKEN_COOKIE)
    cookies().delete(AUTH_REFRESH_TOKEN)
    if (redirectRequire){
        redirect(AUTH_LOGOUT_REDIRECT) // Navigate to the new post page
    }
}

export const checkAuthCookies = async (): Promise<boolean> => {
    const cookieStore = cookies()
    const token = cookieStore.get(AUTH_TOKEN_COOKIE)
    return checkToken(token?.value)
}

export const setAuthCookies = async (response: { access_token: string, refresh_token?: string|null }, remember?: boolean) => {
    let exp = undefined;
    const cookiesStore = cookies()
    if (remember) {
        const decoded = jwtDecode<{ exp: number }>(response.access_token);
        exp = new Date(decoded.exp * 1000);
    }
    cookiesStore.set(
        AUTH_TOKEN_COOKIE, `Bearer ${response.access_token}`,
        {
            path: COOKIE_PATH,
            expires: exp,
            secure: COOKIE_ENABLE_SECURE,
            sameSite: COOKIE_SAME_SITE,
        }
    )
    if (response?.refresh_token) {
        const decoded = jwtDecode<{ exp: number }>(response.access_token)
        const exp = new Date(decoded.exp * 1000)

        cookiesStore.set(
            AUTH_REFRESH_TOKEN, response.refresh_token,
            {
                path: COOKIE_PATH,
                // maxAge,
                expires: exp,
                secure: COOKIE_ENABLE_SECURE,
                sameSite: COOKIE_SAME_SITE,
            }
        )
    }
}