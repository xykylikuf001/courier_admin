/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_payment_append_attachment } from '../models/Body_payment_append_attachment';
import type { Body_payment_deposit_manual } from '../models/Body_payment_deposit_manual';
import type { IPaginationDataBase_PaymentVisible_ } from '../models/IPaginationDataBase_PaymentVisible_';
import type { IPaginationDataBase_TransactionVisible_ } from '../models/IPaginationDataBase_TransactionVisible_';
import type { IResponseBase_PaymentVisible_ } from '../models/IResponseBase_PaymentVisible_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { PaymentVisible } from '../models/PaymentVisible';
import type { TransactionVisible } from '../models/TransactionVisible';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PaymentService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Payment-List
     * @returns IPaginationDataBase_PaymentVisible_ Successful Response
     * @throws ApiError
     */
    public paymentList({
        lang,
        page,
        limit,
    }: {
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_PaymentVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/payment/',
            query: {
                'lang': lang,
                'page': page,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Payment-Deposit-Manual
     * @returns IResponseBase_PaymentVisible_ Successful Response
     * @throws ApiError
     */
    public paymentDepositManual({
        formData,
        lang,
    }: {
        formData: Body_payment_deposit_manual,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_PaymentVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/payment/deposit/manual/',
            query: {
                'lang': lang,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Payment-Append-Attachment
     * @returns IResponseBase_PaymentVisible_ Successful Response
     * @throws ApiError
     */
    public paymentAppendAttachment({
        objId,
        formData,
        lang,
    }: {
        objId: number,
        formData: Body_payment_append_attachment,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_PaymentVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/payment/{obj_id}/append-attachment/',
            path: {
                'obj_id': objId,
            },
            query: {
                'lang': lang,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Payment-Detail
     * @returns PaymentVisible Successful Response
     * @throws ApiError
     */
    public paymentDetail({
        objId,
        lang,
    }: {
        objId: number,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<PaymentVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/payment/{obj_id}/detail/',
            path: {
                'obj_id': objId,
            },
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Payment-Refund
     * @returns IResponseBase_PaymentVisible_ Successful Response
     * @throws ApiError
     */
    public paymentRefund({
        objId,
        lang,
    }: {
        objId: number,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_PaymentVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/payment/{obj_id}/refund/',
            path: {
                'obj_id': objId,
            },
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Transaction-List
     * @returns IPaginationDataBase_TransactionVisible_ Successful Response
     * @throws ApiError
     */
    public transactionList({
        lang,
        page,
        limit,
    }: {
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_TransactionVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/payment/transaction/',
            query: {
                'lang': lang,
                'page': page,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Transaction-Detail
     * @returns TransactionVisible Successful Response
     * @throws ApiError
     */
    public transactionDetail({
        objId,
        lang,
    }: {
        objId: number,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<TransactionVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/payment/transaction/{obj_id}/detail/',
            path: {
                'obj_id': objId,
            },
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
