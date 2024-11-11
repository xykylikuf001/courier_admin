import getServerInstance from "@/openapi/server-instance";
import {MD_DELAY} from "@/lib/constants";
import Content from "./content";

const Page = async () => {

    const fetchClient = getServerInstance(
        {next: {revalidate: MD_DELAY, tags: ['get-me', "auth-session"]}, withAuth: true}
    );
    const data = await fetchClient.account.me({})

    const userSessions = await fetchClient.account.authSessions({})

    return (
        <Content data={data} sessions={userSessions}/>
    )
}

export default Page;