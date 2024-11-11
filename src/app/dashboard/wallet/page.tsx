import {Suspense} from "react";
import type {Metadata} from "next";

import Await from "@/lib/await";
import {MD_DELAY} from "@/lib/constants";
import Skeleton from "@/components/ui/Skeleton";
import getServerInstance from "@/openapi/server-instance";

import Content from "./content";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
};

export const metadata: Metadata = {
  title: 'Wallets list',
}


const Page =  ({searchParams}: Props)=>{

  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10
    
    const fetchClient = getServerInstance(
        {withAuth: true, next: {revalidate: MD_DELAY, tags: ["wallet-list"] }}
    );
    const promise = fetchClient.wallet.walletList(
        {page: page, limit: limit}
    );

    return (
          <Suspense fallback={<Skeleton />}>
            <Await promise={promise}>
              {({rows}) => (
                  <Content rows={rows} page={page} limit={limit}/>
              )}
            </Await>
          </Suspense>
    )
}

export default Page;