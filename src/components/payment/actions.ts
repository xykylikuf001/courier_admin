"use server"
import {ApiError} from "@/openapi/client";
import {checkAuthCookies} from "@/lib/auth/actions";
import {AuthError} from "@/lib/auth/exceptions";
import getServerInstance from "@/openapi/server-instance";
import {revalidateTag} from "next/cache";

export async function depositAmount(formData: FormData) {
    const isAuth = checkAuthCookies();
    if (!isAuth) {
        throw new AuthError("You must be signed in to perform this action!");
    }
    const fetchClient = getServerInstance();
    let result;
    const data = {
        "upload_file": formData.get("file") as File,
        "amount": formData.get("amount") as string,
        "receiver_user_id": formData.get("receiverUserId") as string
    }
    try {
        const response = await fetchClient.payment.paymentDepositManual(
            {formData: data}
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
    revalidateTag("user-wallet");
    revalidateTag("wallet-list");
    revalidateTag("payment-list");
    return result;
}