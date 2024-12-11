"use client"

import {useRouter} from "next/navigation";

import {toast} from "@/lib/helper";
import Button from "@/components/ui/Button";
import {
    AUTH_LOGOUT_REDIRECT,
    WEBSITE_URL
} from "@/lib/constants";
import {getSafeRedirectUrl} from "@/lib/getSafeRedirectUrl";
import {destroyAuthCookies} from "@/lib/auth/actions";
const LogoutButton = ({className = ""}: { className?: string }) => {


    const router = useRouter();

    let redirectUrl =  AUTH_LOGOUT_REDIRECT;

    if (/"\//.test(redirectUrl)) redirectUrl = redirectUrl.substring(1);

    // If not absolute URL, make it absolute
    if (!/^https?:\/\//.test(redirectUrl)) {
        redirectUrl = `${WEBSITE_URL}/${redirectUrl}`;
    }

    const safeCallbackUrl = getSafeRedirectUrl(redirectUrl, new URLSearchParams());

    redirectUrl = safeCallbackUrl || AUTH_LOGOUT_REDIRECT;
    const handleLogout = async () => {
        // destroyCookie(null, AUTH_TOKEN_COOKIE)
        // destroyCookie(null, AUTH_REFRESH_TOKEN)
        await destroyAuthCookies(false)
        // refreshTokenPayload()
        toast("Hope to see you soon! 👋", 'warning');
        router.replace(redirectUrl)
    }
    return (
        <Button
            onClick={handleLogout}
            className={className}
        >
            Logout
        </Button>
    )
}

export default LogoutButton;