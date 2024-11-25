import {JSX} from "react";
import {redirect, RedirectType} from "next/navigation";

import {ApiError} from "@/openapi/client";
import {AUTH_LOGOUT_URL} from "@/lib/constants";


export default async function Await<T>(
    {promise, children}: {
        promise: Promise<T>
        children: (value: T) => JSX.Element
    }) {
    let error: ApiError|null = null;
    try {
        const data = await promise;
        return children(data);
    } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
            error = e;
        } else{

            return (
                <div className="h-full w-full flex items-center justify-center">
                    <div>Error handler - Await component</div>
                </div>
            )
        }
    }
    if (error){
        redirect(AUTH_LOGOUT_URL, RedirectType.replace)
    }
}
