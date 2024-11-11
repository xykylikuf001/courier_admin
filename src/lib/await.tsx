import {JSX} from "react";
import {redirect, RedirectType} from "next/navigation";

import {ApiError} from "@/openapi/client";
import {AUTH_LOGOUT_URL} from "@/lib/constants";


export default async function Await<T>(
    {promise, children}: {
        promise: Promise<T>
        children: (value: T) => JSX.Element
    }) {
    try {
        let data = await promise;
        return children(data);
    } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
            redirect(AUTH_LOGOUT_URL, RedirectType.replace)
        }
        return (
            <div className="h-full w-full flex items-center justify-center">
                <div>Error handler - Await component</div>
            </div>
        )
    }
}
