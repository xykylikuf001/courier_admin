import type {Metadata} from "next";

import getServerInstance, {callRequest} from "@/openapi/server-instance";
import {MD_DELAY} from "@/lib/constants";
import Content from "./content";
import {PlaceVisibleExtended} from "@/openapi/client";

export const metadata: Metadata = {
    title: 'View single place',
}

type Props = {
    params: Promise<{ id: number }>
};


const Page = async ({params}: Props) => {
    const {id} = await params;
    const fetchClient = await getServerInstance(
        {next: {revalidate: MD_DELAY, tags: ['place-detail']}, withAuth: true}
    );
    const data: PlaceVisibleExtended = await callRequest({
        instance:fetchClient, service:"location",action: "placeDetail",params: {"objId": id}
    })

    return (
        <Content data={data}/>
    )
}

export default Page;
