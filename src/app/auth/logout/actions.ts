"use server"

import getServerInstance from "@/openapi/server-instance";
import {ValidationError, ApiError} from "@/openapi/client";


interface IResponse {
    status: number,
    message: string | null,
    errors: ValidationError[] | null
}


export async function logoutAction(): Promise<IResponse> {
    const fetchClient = await getServerInstance({withAuth: false, next: {revalidate: 0}});
    try {
        await fetchClient.account.logout({})
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