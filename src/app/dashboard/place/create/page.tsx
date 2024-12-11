import Form from "./form";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Add new place',
}


const Page = async () => {
    return (
        <Form/>
    )
}

export default Page;