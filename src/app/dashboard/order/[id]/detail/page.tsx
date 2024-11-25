import type {Metadata} from "next";

import getServerInstance, {callRequest} from "@/openapi/server-instance";
import {MD_DELAY} from "@/lib/constants";
import Content from "./content";
import {OrderVisible} from "@/openapi/client";

export const metadata: Metadata = {
    title: 'View single order',
}

type Props = {
    params: Promise<{ id: string }>
};


const Page = async ({params}: Props) => {
    const {id} = await params;
    const fetchClient = await getServerInstance(
        {next: {revalidate: MD_DELAY, tags: ['order-detail']}, withAuth: true}
    );
    const data: OrderVisible = await callRequest({
        instance:fetchClient, service:"order",action: "orderDetail",params: {"objId": id}
    })

    return (
        <Content data={data}/>
    )
}

export default Page;
