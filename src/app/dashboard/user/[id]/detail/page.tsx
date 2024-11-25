import type {Metadata} from "next";

import getServerInstance, {callRequest} from "@/openapi/server-instance";
import {MD_DELAY} from "@/lib/constants";
import Content from "./content";
import {UserVisible} from "@/openapi/client";

export const metadata: Metadata = {
    title: 'View single user',
}

type Props = {
    params: Promise<{ id: string }>
};


const Page = async ({params}: Props) => {
    const {id} = await params;
    const fetchClient = await getServerInstance(
        {next: {revalidate: MD_DELAY, tags: ['user-detail']}, withAuth: true}
    );
    const data: UserVisible = await callRequest({
        instance:fetchClient, service:"account",action: "userDetail",params: {"objId": id}
    })

    return (
        <Content data={data}/>
    )
}

export default Page;
