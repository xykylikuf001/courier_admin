'use server'

import getServerInstance from "@/openapi/server-instance";
import {ApiError} from "@/openapi/client";


import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";
import {MD_DELAY} from "@/lib/constants";


export async function retrieveWalletPayments(objId: string, page: number, limit: number) {
    const isAuth = checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = getServerInstance({
        next: {revalidate: MD_DELAY, tags: ['wallet-payment-list']},
        withAuth: true
    });
    let result;
    try {
        const response = await fetchClient.wallet.walletPayments(
            {objId, page, limit}
        )
        result = {
            status: 200, message: null, data: {
                limit: response.limit,
                page: response.page,
                rows: response.rows
            }, errors: null
        }
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
    return result;
}
