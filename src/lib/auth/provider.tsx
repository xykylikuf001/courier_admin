'use client'
import React, {useEffect, useState} from "react";
import {parseCookies} from "nookies";
import {UserVisible} from "@/openapi/client";
import {AUTH_TOKEN_COOKIE} from "@/lib/constants";
import jwtDecode from "jwt-decode";

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
    setUserData: (value) => undefined,
    token: null,
})

const retrievePayload = (token: string) => {
    const [schema, _token] = token.split(' ');

    try {
        return jwtDecode(_token);
    } catch (error) {
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
        }
    }

    useEffect(() => {
        refreshTokenPayload();
    }, [token])


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
