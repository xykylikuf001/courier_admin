'use client'
import React, {useEffect, useState} from "react";
import {parseCookies} from "nookies";
import jwtDecode from "jwt-decode";

import {UserVisible} from "@/openapi/client";
import {AUTH_TOKEN_COOKIE} from "@/lib/constants";
import {navigateToLogout} from "@/lib/auth/actions";

interface TokenPayload {
    user_id: string
    username: string
    iat?: string;
    exp: number
    aud: string
}

export type AuthContextType = {
    payload: TokenPayload | null;
    refreshTokenPayload: () => void;
    user: UserVisible | null;
    setUserData: (value: UserVisible | null) => void;
    token: string | null
}


const AuthContext = React.createContext<AuthContextType>({
    payload: null,
    refreshTokenPayload: () => undefined,
    user: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUserData: (value) => undefined,
    token: null,
})

const retrievePayload = (token: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [schema, _token] = token.split(' ');

    try {
        return jwtDecode(_token);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
        return null;
    }
}

function AuthProvider({children}: { children: React.ReactNode }) {

    const cookies = parseCookies({})
    const token = cookies[AUTH_TOKEN_COOKIE]
    const [user, setUser] = useState<UserVisible | null>(null)
    const [payload, setPayload] = useState<TokenPayload | null>(null)

    const refreshTokenPayload = () => {
        const cookies = parseCookies({})
        const token = cookies[AUTH_TOKEN_COOKIE]
        if (token) {
            const tokenPayload = retrievePayload(token)
            setPayload(tokenPayload as TokenPayload)
        } else {
            setPayload(null);
            setUser(null);
        }
    }

    const userFetchCallback = React.useCallback(async () => {
        if (!token) return
        try {
            const response =  await fetch(`/api/auth/me`, {
                cache: 'no-store',
                next: { revalidate: 10 },
            })
            const data: {data: UserVisible | null, status: number} = await response.json()
            if (data.status === 200) {
                setUser(data.data);
            } else if (data.status === 401){
                await navigateToLogout()
            }
        } catch (e: any) {
            console.log(e)
            setUser(null)
        }
    }, [token])

    useEffect(() => {
        refreshTokenPayload();
    }, [token])

    useEffect(() => {
        userFetchCallback();
    }, [userFetchCallback])

    const memoValue = React.useMemo(
        () => ({
            payload: payload,
            refreshTokenPayload: refreshTokenPayload,
            user,
            setUserData: (value: UserVisible | null) => setUser(value),
            token,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [payload, user, token]
    )


    return (
        <AuthContext.Provider value={memoValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;


export const useAuthContext = (): AuthContextType => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider')
    }
    return context
}
