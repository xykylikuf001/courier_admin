'use server'

import getServerInstance from "@/openapi/server-instance";
import {ApiError, ProfilePasswordIn} from "@/openapi/client";


import {revalidateTag} from 'next/cache'
import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";


export async function edit(values: {
    name: string;
}) {
    const isAuth = await checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = await getServerInstance();
    let result;
    try {
        const response = await fetchClient.account.userProfileUpdate(
            {formData: values}
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
    revalidateTag("get-me");
    revalidateTag("user-list");
    revalidateTag("user-detail");

    return result;
}


export async function changePassword(values: ProfilePasswordIn) {
    const isAuth = await checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = await getServerInstance();
    let result;
    try {
        const response = await fetchClient.account.userProfileChangePassword(
            {requestBody: values}
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
    return result;
}


export async function revoke(objId: string) {
    const isAuth = checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = await getServerInstance();
    let result;
    try {
        const response = await fetchClient.account.authSessionRevoke(
            {objId: objId}
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
    revalidateTag("auth-session");

    return result;
}


export async function revokeAll() {
    const isAuth = await checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = await getServerInstance();
    let result;
    try {
        const response = await fetchClient.account.authSessionRevokeAll({})
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
    revalidateTag("auth-session");

    return result;
}
