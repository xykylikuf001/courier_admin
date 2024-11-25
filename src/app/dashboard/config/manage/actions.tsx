'use server'

import {ApiError, ConfigCreate} from "@/openapi/client";
import {revalidateTag} from 'next/cache'
import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";
import getServerInstance from "@/openapi/server-instance";

export async function manage(values: ConfigCreate) {
    const isAuth = await checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = await getServerInstance({withAuth: true});

    let result;
    try {
        const response = await fetchClient.config.configManage(
            {requestBody: values}
        )
        result = {status: 200, message: response.message, data: response.data, errors: null}
    } catch (e: any) {
        if (e instanceof ApiError) {
            if (e.status === 422) {
                return {status: e.status, message: "Please provide valid data", errors: e.body.detail, data: null};
            } else {
                return {status: e.status, message: e.body.detail, errors: null, data: null};
            }
        }
        return {status: 500, errors: null, message: "Something went wrong!", data: null};
    }

    revalidateTag("config-detail");
    return result;
}