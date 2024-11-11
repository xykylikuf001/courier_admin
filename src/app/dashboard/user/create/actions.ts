'use server'

import {revalidateTag} from 'next/cache';

import getServerInstance from "@/openapi/server-instance";
import {ApiError} from "@/openapi/client";
import type {UserVisible, UserCreate, ValidationError} from "@/openapi/client";
import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";


interface IResponse {
    status: number;
    message: string | null | undefined;
    errors: ValidationError[] | null;
    data: UserVisible | null;
}

export const create = async (values: UserCreate): Promise<IResponse> => {
    const isAuth = checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = getServerInstance({withAuth: true});
    let result = undefined;
    try {
        const response = await fetchClient.account.userCreate(
            {requestBody: values}
        );
        result = {status: 201, message: response.message, data: response.data, errors: null};
    } catch (e: any) {
        console.log(e.body.detail)
        if (e instanceof ApiError) {
            if (e.status === 422) {
                return {status: e.status, message: "Please provide valid data", errors: e.body.detail, data: null};
            } else {
                return {status: e.status, message: e.body.detail, errors: null, data: null};
            }
        }
        return {status: 500, errors: null, message: "Something went wrong!", data: null};
    }
    revalidateTag("user-list");
    return result;
}
