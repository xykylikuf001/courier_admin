import type {Metadata} from "next";

import getServerInstance from "@/openapi/server-instance";
import {MD_DELAY} from "@/lib/constants";
import Content from "./content";

export const metadata: Metadata = {
    title: 'View single user',
}

type Props = {
    params: { id: string }
};


const Page = async ({params: {id}}: Props) => {

    const fetchClient = getServerInstance(
        {next: {revalidate: MD_DELAY, tags: ['user-detail']}, withAuth: true}
    );
    const data = await fetchClient.account.userDetail({objId: id})

    return (
        <Content data={data}/>
    )
}

export default Page;
