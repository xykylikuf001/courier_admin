/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IPaginationDataBase_OrderVisible_ } from '../models/IPaginationDataBase_OrderVisible_';
import type { IResponseBase_OrderVisible_ } from '../models/IResponseBase_OrderVisible_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { OrderBase } from '../models/OrderBase';
import type { OrderCreate } from '../models/OrderCreate';
import type { OrderStatusChoices } from '../models/OrderStatusChoices';
import type { OrderVisible } from '../models/OrderVisible';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OrderService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Order-List
     * @returns IPaginationDataBase_OrderVisible_ Successful Response
     * @throws ApiError
     */
    public orderList({
        orderBy,
        lang,
        page,
        limit,
    }: {
        orderBy?: ('created_at' | '-created_at' | null),
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_OrderVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/order/',
            query: {
                'order_by': orderBy,
                'lang': lang,
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Order-Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public orderCount({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/order/count/',
            query: {
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Order-Detail
     * @returns OrderVisible Successful Response
     * @throws ApiError
     */
    public orderDetail({
        objId,
        lang,
    }: {
        objId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<OrderVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/order/{obj_id}/detail/',
            path: {
                'obj_id': objId,
            },
            query: {
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Order-Update
     * @returns IResponseBase_OrderVisible_ Successful Response
     * @throws ApiError
     */
    public orderUpdate({
        objId,
        requestBody,
        lang,
    }: {
        objId: string,
        requestBody: OrderBase,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_OrderVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/order/{obj_id}/update/',
            path: {
                'obj_id': objId,
            },
            query: {
                'lang': lang,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Order-Delete
     * @returns IResponseBase_OrderVisible_ Successful Response
     * @throws ApiError
     */
    public orderDelete({
        objId,
        lang,
    }: {
        objId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_OrderVisible_> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/order/{obj_id}/delete/',
            path: {
                'obj_id': objId,
            },
            query: {
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Order-My-List
     * @returns IPaginationDataBase_OrderVisible_ Successful Response
     * @throws ApiError
     */
    public orderMyList({
        orderBy,
        status,
        lang,
        page,
        limit,
    }: {
        orderBy?: ('created_at' | '-created_at' | null),
        status?: (OrderStatusChoices | null),
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_OrderVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/order/my/list/',
            query: {
                'order_by': orderBy,
                'status': status,
                'lang': lang,
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Order-My-Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public orderMyCount({
        status,
        lang,
    }: {
        status?: (OrderStatusChoices | null),
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/order/my/count/',
            query: {
                'status': status,
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Order-My-Create
     * @returns IResponseBase_OrderVisible_ Successful Response
     * @throws ApiError
     */
    public orderMyCreate({
        requestBody,
        lang,
    }: {
        requestBody: OrderCreate,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_OrderVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/order/my/create/',
            query: {
                'lang': lang,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Order-My-Detail
     * @returns OrderVisible Successful Response
     * @throws ApiError
     */
    public orderMyDetail({
        objId,
        lang,
    }: {
        objId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<OrderVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/order/my/{obj_id}/detail/',
            path: {
                'obj_id': objId,
            },
            query: {
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Order-My-Cancel
     * @returns IResponseBase_OrderVisible_ Successful Response
     * @throws ApiError
     */
    public orderMyCancel({
        objId,
        lang,
    }: {
        objId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_OrderVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/order/my/{obj_id}/cancel/',
            path: {
                'obj_id': objId,
            },
            query: {
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
