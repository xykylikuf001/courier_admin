import {Suspense} from "react";

import Await from "@/lib/await";
import Skeleton from "@/components/ui/Skeleton"; 
import getServerInstance from "@/openapi/server-instance";
import type {Metadata} from "next";
import {MD_DELAY} from "@/lib/constants";

import Content from "./content";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
};

export const metadata: Metadata = {
  title: 'Lobby list',
}


const Page =  ({searchParams}: Props)=>{

  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10
    
    const fetchClient = getServerInstance(
        {withAuth: true, next: {revalidate: MD_DELAY, tags: ["lobby-list"] }}
    );
    const promise = fetchClient.lobby.lobbyList(
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