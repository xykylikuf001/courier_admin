'use server'
import {revalidateTag} from 'next/cache';

import getServerInstance from "@/openapi/server-instance";
import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";


interface IResponse {
    status: number;
    message: string | null | undefined;
}

export const deleteAction = async (id: number): Promise<IResponse> => {
    const isAuth = checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = getServerInstance({withAuth: true});
    let result = undefined;
    try {
        await fetchClient.lobby.lobbyDelete({objId: id}
        );
        result = {status: 200, message: null};
    } catch (e: any) {
        return {status: 500, message: "Something went wrong!"};
    }
    revalidateTag("lobby-list");
    revalidateTag("lobby-detail");
    return result;
}
