/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IPaginationDataBase_WalletPayment_ } from '../models/IPaginationDataBase_WalletPayment_';
import type { IPaginationDataBase_WalletVisibleExtended_ } from '../models/IPaginationDataBase_WalletVisibleExtended_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { WalletVisible } from '../models/WalletVisible';
import type { WalletVisibleExtended } from '../models/WalletVisibleExtended';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class WalletService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Wallet-List
     * @returns IPaginationDataBase_WalletVisibleExtended_ Successful Response
     * @throws ApiError
     */
    public walletList({
        lang,
        page,
        limit,
    }: {
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_WalletVisibleExtended_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/wallet/',
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
     * Wallet-By-User
     * @returns WalletVisible Successful Response
     * @throws ApiError
     */
    public walletByUser({
        userId,
        lang,
    }: {
        userId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<WalletVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/wallet/get-by-user/',
            query: {
                'user_id': userId,
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Wallet-Detail
     * @returns WalletVisibleExtended Successful Response
     * @throws ApiError
     */
    public walletDetail({
        objId,
        lang,
    }: {
        objId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<WalletVisibleExtended> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/wallet/{obj_id}/detail/',
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
     * Wallet-Payments
     * @returns IPaginationDataBase_WalletPayment_ Successful Response
     * @throws ApiError
     */
    public walletPayments({
        objId,
        lang,
        page,
        limit,
    }: {
        objId: string,
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_WalletPayment_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/wallet/{obj_id}/payments/',
            path: {
                'obj_id': objId,
            },
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
}
