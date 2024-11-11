import type {Metadata} from "next";

import getServerInstance from "@/openapi/server-instance";
import {MD_DELAY} from "@/lib/constants";
import Content from "./content";

export const metadata: Metadata = {
    title: 'View single payment',
}

type Props = {
    params: { id: number }
};


const Page = async ({params: {id}}: Props) => {

    const fetchClient = getServerInstance(
        {next: {revalidate: MD_DELAY, tags: ['transaction-detail']}, withAuth: true}
    );
    const data = await fetchClient.payment.transactionDetail({objId: id})

    return (
        <Content data={data}/>
    )
}

export default Page;
