'use server'

import getServerInstance from "@/openapi/server-instance";
import {ApiError, OrderBase} from "@/openapi/client";


import {revalidateTag} from 'next/cache'
import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";


export async function edit(
    id: string, values: OrderBase
) {
    const isAuth = await checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = await getServerInstance();
    let result;
    try {
        const response = await fetchClient.order.orderUpdate(
            {objId: id, requestBody: values}
        )
        result = {status: 200, message: response.message, data: response.data, errors: null}
    } catch (e: any) {
        console.log(e)
        if (e instanceof ApiError) {
            if (e.status === 422) {
                return {status: e.status, message: "Please provide valid data", errors: e.body.detail, data: null}
            } else {
                return {status: e.status, message: e.body.detail, errors: null, data: null}
            }
        }
        return {status: 500, errors: null, message: "Something went wrong!", data: null}
    }
    revalidateTag("order-list");
    revalidateTag("order-detail");

    return result;
}

