'use server'

import getServerInstance from "@/openapi/server-instance";
import {ApiError, PaymentVisible, ValidationError} from "@/openapi/client";


import {revalidateTag} from 'next/cache'
import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";

interface IResponse {
    status: number;
    message: string | null | undefined;
    errors: ValidationError[] | null;
    data: PaymentVisible | null;
}

export async function refund(id: number): Promise<IResponse> {
    const isAuth = checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = getServerInstance();
    let result;
    try {
        const response = await fetchClient.payment.paymentRefund(
            {objId: id}
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
    revalidateTag("payment-list");
    revalidateTag("payment-detail");
    revalidateTag("wallet-detail");
    revalidateTag("wallet-list");
    revalidateTag("user-wallet");

    return result;
}



interface MediaAddResponse {
    status: number;
    message: string | null | undefined;
    errors: ValidationError[] | null;
    data: any | null;
}

export const appendAttachment = async (formData: FormData): Promise<MediaAddResponse> => {
    const isAuth = checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }

    const uploadFile = formData.get("file") as File;
    const unparsedPaymentId = formData.get("paymentId") as string;

    const paymentId = Number(unparsedPaymentId);
     if (isNaN(paymentId)) {
        return {
            status: 422, message: "Invalid payment Id", errors: null, data: null
        }
    }

    const fetchClient = getServerInstance({withAuth: true});

    let result = undefined;
    try {
        const response = await fetchClient.payment.paymentAppendAttachment(
            {objId: paymentId, formData: {upload_file: uploadFile}}
        );
        result = {status: 201, message: response.message, data: response.data, errors: null};
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

    revalidateTag("payment-detail");
    return result;
}