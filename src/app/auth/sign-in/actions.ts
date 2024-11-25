"use server"

import getServerInstance from "@/openapi/server-instance";
import {ValidationError, ApiError} from "@/openapi/client";

import {setAuthCookies} from "@/lib/auth/actions";

interface IResponse {
    status: number,
    message: string | null,
    errors: ValidationError[] | null
}

export interface AuthProps {
    username: string;
    password: string;
    remember: boolean;
}


export async function authenticate(values: AuthProps): Promise<IResponse> {
    const fetchClient = await getServerInstance({withAuth: false, next: {revalidate: 0}});
    try {
        const response = await fetchClient.account.getToken(
            {formData: {username: values.username, password: values.password}}
        )
        await setAuthCookies(response, values.remember);
        return {status: 200, message: null, errors: null}
    } catch (e: any) {
        if (e instanceof ApiError) {
            if (e.status === 422) {
                return {status: e.status, message: "Please provide valid data", errors: e.body.detail}
            } else {
                return {status: e.status, message: e.body.detail, errors: null}
            }
        }
        return {status: 500, errors: null, message: "Something went wrong"}
    }
}