import {Suspense} from "react";

import Await from "@/lib/await";
import Skeleton from "@/components/ui/Skeleton";
import getServerInstance from "@/openapi/server-instance";
import type {Metadata} from "next";
import {MD_DELAY} from "@/lib/constants";

import Content from "./content";
import {getSearchParamsLang} from "@/lib/helper";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export const metadata: Metadata = {
    title: 'Places list',
}


const Page = async ({searchParams}: Props) => {
    const data = await searchParams;
    let safePage = typeof data.page === 'string' ? Number(data.page) : 1
    let safeLimit = typeof data.limit === 'string' ? Number(data.limit) : 10
    const lang = getSearchParamsLang(data)
    if (isNaN(safePage)) {
        safePage = 1
    }
    if (isNaN(safeLimit)) {
        safeLimit = 1
    }
    const fetchClient = await getServerInstance(
        {withAuth: true, next: {revalidate: MD_DELAY, tags: ["place-list"]}, callbacks: {}}
    );
    const promise = fetchClient.location.placeList(
        {page: safePage, limit: safeLimit, lang: lang}
    );

    return (
        <Suspense fallback={<Skeleton/>}>
            <Await promise={promise}>
                {({rows}) => (
                    <Content lang={lang} rows={rows} page={safePage} limit={safeLimit}/>
                )}
            </Await>
        </Suspense>
    )
}

export default Page;