'use server'

import getServerInstance from "@/openapi/server-instance";
import {revalidateTag} from 'next/cache'


import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";
import {
    ApiError,
    PlaceBase,
    ValidationError,
    PlaceTranslationCreate,
    PlaceTranslationVisible,
    PlaceTranslationBase
} from "@/openapi/client";


interface TranslationResponse {
    status: number;
    message: string | null | undefined;
    errors: ValidationError[] | null;
    data: PlaceTranslationVisible | null
}

export async function edit(id: number, values: PlaceBase) {
    const isAuth = await checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = await getServerInstance();
    let result;
    try {
        const response = await fetchClient.location.placeUpdate(
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
    revalidateTag("place-list");
    revalidateTag("place-detail");

    return result;
}


export const editTranslation = async (
    objId: number, objLocale: string, values: PlaceTranslationBase
): Promise<TranslationResponse> => {
    const isAuth = await checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = await getServerInstance();
    let result;
    try {
        const response = await fetchClient.location.placeTrUpdate(
            {objId: objId, objLocale: objLocale, requestBody: values}
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
    revalidateTag("place-list");
    revalidateTag("place-detail");
    revalidateTag("place-translation-list");
    revalidateTag("place-translation-detail");
    return result
}


export const createTranslation = async (id: number, values: PlaceTranslationCreate): Promise<TranslationResponse> => {
    const isAuth = await checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = await getServerInstance();
    let result;
    try {
        const response = await fetchClient.location.placeTrCreate(
            {objId: id, requestBody: values}
        )
        result = {status: 201, message: response.message, data: response.data, errors: null}
    } catch (e: any) {
        console.log(e.body.detail)
        if (e instanceof ApiError) {
            if (e.status === 422) {
                return {status: e.status, message: "Please provide valid data", errors: e.body.detail, data: null}
            } else {
                return {status: e.status, message: e.body.detail, errors: null, data: null}
            }
        }
        return {status: 500, errors: null, message: "Something went wrong!", data: null}
    }
    revalidateTag("place-list");
    revalidateTag("place-detail");
    revalidateTag("place-translation-list");
    return result;
}