import {cookies} from "next/headers";
import Content from "./content";
import {AUTH_TOKEN_COOKIE, AUTH_LOGIN_URL} from "@/lib/constants";
import {redirect, RedirectType} from "next/navigation";

const Page = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_TOKEN_COOKIE)
    if (!token) {
        redirect(AUTH_LOGIN_URL, RedirectType.replace)
    }

    return (
        <Content/>
    )
}

export default Page;
