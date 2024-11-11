import {cookies} from 'next/headers';
import {notFound, redirect, RedirectType} from 'next/navigation';

import { FetchClient} from "@/openapi/client";
import {BASE_URL, AUTH_TOKEN_COOKIE, AUTH_LOGOUT_URL} from "@/lib/constants";

const CALlBACKS = {
    401: async ()=> {
        redirect(AUTH_LOGOUT_URL, RedirectType.replace)
    },
    404: async ()=> {
        notFound()
    }
}

function getServerInstance(
    {
        next, withAuth = true, callbacks=CALlBACKS
    }: {
        next?: NextFetchRequestConfig | undefined;
        withAuth?: boolean;
        callbacks?:  Record<number, ()=>Promise<void>> | null
    } = {}
): FetchClient {
    const cookieStore = cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "en";

    const config: {
        BASE: string | undefined;
        HEADERS: Record<string, string>;
        TOKEN?: string;
        NEXT?: NextFetchRequestConfig;
        CALLBACKS: Record<number, ()=>Promise<void>> | null;
    } = {
        BASE: BASE_URL,
        HEADERS: {
            'Accept-Language': locale
        },
        NEXT: next,
        CALLBACKS: callbacks
    }
    if (withAuth) {
        const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value
        if (token) config["TOKEN"] = token
    }
    return new FetchClient(config);
}


export default getServerInstance;
