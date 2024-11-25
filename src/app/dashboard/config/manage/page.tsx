import {redirect, RedirectType} from "next/navigation";
import type {Metadata} from "next";

import {AUTH_LOGOUT_URL, MD_DELAY} from "@/lib/constants";
import getServerInstance, {callRequest} from "@/openapi/server-instance";
import Form from "./form";
import {ApiError, ConfigVisible} from "@/openapi/client";


export const metadata: Metadata = {
    title: 'Manage site config',
}


const Page = async () => {
    const fetchClient = await getServerInstance({
        next: {revalidate: MD_DELAY, tags: ["config-detail"]},
        withAuth: true, callbacks: {}
    })
    let data: ConfigVisible | null = null;
    try {
        data = await callRequest({
            instance: fetchClient, service: "config", action: "configDetail", params: {},
            callbacks: {}
        })
    } catch (e: any) {
        if (e instanceof ApiError) {
            if (e.status === 401) {
                redirect(AUTH_LOGOUT_URL, RedirectType.replace);
            } else if (e.status != 404) {
                throw e;
            }
        } else {
            throw e;
        }
    }

    return (
        <Form data={data}/>
    )
}

export default Page;