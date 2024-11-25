import {Suspense} from "react";

import Await from "@/lib/await";
import Skeleton from "@/components/ui/Skeleton";
import getServerInstance from "@/openapi/server-instance";
import type {Metadata} from "next";
import {MD_DELAY} from "@/lib/constants";

import Content from "./content";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export const metadata: Metadata = {
    title: 'Users list',
}


const Page = async ({searchParams}: Props) => {
    const {page, limit} = await searchParams;
    const safePage = typeof page === 'string' ? Number(page) : 1
    const safeLimit = typeof limit === 'string' ? Number(limit) : 10

    const fetchClient = await getServerInstance(
        {withAuth: true, next: {revalidate: MD_DELAY, tags: ["user-list"]}, callbacks: {}}
    );
    const promise = fetchClient.account.userList(
        {page: safePage, limit: safeLimit}
    );

    return (
        <Suspense fallback={<Skeleton/>}>
            <Await promise={promise}>
                {({rows}) => (
                    <Content rows={rows} page={safePage} limit={safeLimit}/>
                )}
            </Await>
        </Suspense>
    )
}

export default Page;