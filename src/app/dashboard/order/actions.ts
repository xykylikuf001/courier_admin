'use server'
import {revalidateTag, revalidatePath } from 'next/cache';

import getServerInstance from "@/openapi/server-instance";
import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";


interface IResponse {
    status: number;
    message: string | null | undefined;
}

export const deleteAction = async (id: string): Promise<IResponse> => {
    const isAuth = await checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = await getServerInstance({withAuth: true});
    let result = undefined;
    try {
        await fetchClient.account.userDelete({objId: id}
        );
        result = {status: 200, message: null};
    } catch {
        return {status: 500, message: "Something went wrong!"};
    }
    revalidateTag("user-list");
    revalidateTag('user-detail');

    revalidatePath('/dashboard/order/[id]/detail', 'page')
    return result;
}
