import type {Metadata} from 'next'

import Content from "./content";

export const metadata: Metadata = {
    title: 'Dashboard home page',
}
const Page = () => {
    return (
        <Content/>
    )
}

export default Page;