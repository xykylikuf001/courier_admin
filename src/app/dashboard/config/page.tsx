import {redirect, RedirectType} from 'next/navigation'


import Content from "./content";
import getServerInstance, {callRequest} from "@/openapi/server-instance";
import {AUTH_LOGOUT_URL, MD_DELAY} from "@/lib/constants";
import type {Metadata} from "next";
import {ConfigVisible} from "@/openapi/client";

export const metadata: Metadata = {
    title: 'Site config',
}


const Page = async () => {
    const fetchClient = await getServerInstance({
        next: {revalidate: MD_DELAY, tags: ["config-detail"]},
        withAuth: true, callbacks: null
    })
    const data: ConfigVisible = await callRequest({
        instance: fetchClient, service: "config", action: "configDetail", params: {}, callbacks: {
            401: async () => {
                redirect(AUTH_LOGOUT_URL, RedirectType.replace)
            },
            404: async () => redirect("/dashboard/config/manage", RedirectType.replace)
        }
    })

    return (
        <Content data={data}/>
    )


}
export default Page;