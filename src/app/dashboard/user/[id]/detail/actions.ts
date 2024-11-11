'use server'

import getServerInstance from "@/openapi/server-instance";
import {ApiError, UserBase} from "@/openapi/client";


import {revalidateTag} from 'next/cache'
import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";
import {MD_DELAY} from "@/lib/constants";


export async function edit(id: string, values: UserBase) {
    const isAuth = checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = getServerInstance();
    let result;
    try {
        const response = await fetchClient.account.userUpdate(
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
    revalidateTag("user-list");
    revalidateTag("user-detail");

    return result;
}


export async function retrieveUserWallet(userId: string) {
    const isAuth = checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = getServerInstance(
        {next: {revalidate: MD_DELAY, tags: ["user-wallet"]}, withAuth: true}
    );
    let result;
    try {
        const response = await fetchClient.wallet.walletByUser(
            {userId: userId}
        )
        result = {status: 200, data: response, errors: null, message: null}
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
    revalidateTag("user-list");
    revalidateTag("user-detail");
    revalidateTag("user-wallet");
    return result;
}