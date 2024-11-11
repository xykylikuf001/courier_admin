'use server'

import getServerInstance from "@/openapi/server-instance";
import {ApiError, LobbyVisible, LobbyBase, ValidationError} from "@/openapi/client";


import {revalidateTag} from 'next/cache'
import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";

interface IResponse {
    status: number;
    message: string | null | undefined;
    errors: ValidationError[] | null;
    data: LobbyVisible | null;
}

export async function edit(id: number, values: LobbyBase): Promise<IResponse> {
    const isAuth = checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = getServerInstance();
    let result;
    try {
        const response = await fetchClient.lobby.lobbyUpdate(
            {objId: id, requestBody: values}
        )
        result = {status: 200, message: response.message, data: response.data, errors: null}
    } catch (e: any) {
        if (e instanceof ApiError) {
            if (e.status === 422) {
                return {status: e.status, message: "Please provide valid data", errors: e.body.detail, data: null}
            } else {
                return {status: e.status, message: e.body.detail, errors: null, data: null}
            }
        }
        return {status: 500, errors: null, message: "Something went wrong!", data: null}
    }
    revalidateTag("lobby-list");
    revalidateTag("lobby-detail");

    return result;
}
