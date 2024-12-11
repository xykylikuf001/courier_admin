import {cookies} from 'next/headers';
import {notFound, redirect, RedirectType} from 'next/navigation';
import {ApiError, FetchClient} from "@/openapi/client";

import {BASE_URL, AUTH_TOKEN_COOKIE, AUTH_LOGOUT_URL} from "@/lib/constants";

const CALlBACKS = {
    401: async () => {
        redirect(AUTH_LOGOUT_URL, RedirectType.replace)
    },
    404: async () => {
        notFound()
    }
}

async function getServerInstance(
    {
        next, withAuth = true, callbacks = CALlBACKS
    }: {
        next?: NextFetchRequestConfig | undefined;
        withAuth?: boolean;
        callbacks?: Record<number, () => Promise<void>> | null
    } = {}
): Promise<FetchClient> {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "en";

    const config: {
        BASE: string | undefined;
        HEADERS: Record<string, string>;
        TOKEN?: string;
        NEXT?: NextFetchRequestConfig;
        CALLBACKS: Record<number, () => Promise<void>> | null;
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


export async function callRequest<T, Y>(
    {instance, service, action, params, callbacks=CALlBACKS}: {
        instance: FetchClient,
        service: keyof FetchClient,
        action: string,
        params: T,
        callbacks?: Record<number, () => Promise<void>> | null
    }
): Promise<Y> {
    let error = null
    let result: any = null;
    try {
        const serviceInstance = instance[service] as any; // Dynamic access to the service
        if (typeof serviceInstance[action] === 'function') {
            result = await serviceInstance[action](params);
        } else {
            throw new Error(`Action '${action}' is not a function on service '${service}'`);
        }
    } catch (e) {
        error = e
    }
    if (error instanceof ApiError) {

        if (callbacks && callbacks[error.status]) {
            const callback = callbacks[error.status]
            await callback()
        } else {
            throw error; // Re-throw for other ApiError statuses
        }
    } else if (error) {
        throw error; // Re-throw if it's not an ApiError
    }

    return result
}

export default getServerInstance;
