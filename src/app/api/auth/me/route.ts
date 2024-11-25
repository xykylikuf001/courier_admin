import {checkAuthCookies} from "@/lib/auth/actions";
import getServerInstance from "@/openapi/server-instance";
import {ApiError} from "@/openapi/client";

export async function GET() {
    const isAuth = await checkAuthCookies();
    if (!isAuth) {
        return Response.json({data: null})
    }

    const fetchClient = await getServerInstance(
        {
            next: {revalidate: 0, tags: ["auth-me"]}, withAuth: true, callbacks: {}
        }
    );
    try {
        const response = await fetchClient.account.me({})
        return Response.json({data: response, status: 200})

    } catch (e) {
        if (e instanceof ApiError) {
            return Response.json({data: e.body, status: e.status})
        }
        return Response.json({data: null, status: 500})
    }
}