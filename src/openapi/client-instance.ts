import {FetchClient} from "@/openapi/client";
import {BASE_URL} from "@/lib/constants";
import {navigateToLogout} from "@/lib/auth/actions";


function getClientInstance(
    {next, token}: { next?: NextFetchRequestConfig | undefined, token?: string | null } = {}
): FetchClient {
    const config: {
        BASE: string | undefined,
        TOKEN?: string,
        NEXT?: NextFetchRequestConfig,
        CALLBACKS: Record<number, ()=>Promise<void>>
    } = {
        BASE: BASE_URL,
        NEXT: next,
        CALLBACKS: {
            401: navigateToLogout
        }
    }
    if (token) config["TOKEN"] = token
    return new FetchClient(config);
}


export default getClientInstance;
