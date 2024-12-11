/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IPaginationDataBase_MessageVisible_ } from '../models/IPaginationDataBase_MessageVisible_';
import type { IResponseBase_MessageVisible_ } from '../models/IResponseBase_MessageVisible_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { MessageCreate } from '../models/MessageCreate';
import type { MessageVisible } from '../models/MessageVisible';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class MessageService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Message-List
     * @returns IPaginationDataBase_MessageVisible_ Successful Response
     * @throws ApiError
     */
    public messageList({
        search,
        isRead,
        orderBy,
        locale,
        page,
        limit,
    }: {
        search?: (string | null),
        isRead?: (boolean | null),
        orderBy?: ('id' | '-id' | null),
        locale?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_MessageVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/message/',
            query: {
                'search': search,
                'is_read': isRead,
                'order_by': orderBy,
                'locale': locale,
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
     * Message-Detail
     * @returns MessageVisible Successful Response
     * @throws ApiError
     */
    public messageDetail({
        objId,
        locale,
    }: {
        objId: number,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<MessageVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/message/{obj_id}/detail/',
            path: {
                'obj_id': objId,
            },
            query: {
                'locale': locale,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Message-Contact-Us
     * @returns IResponseBase_MessageVisible_ Successful Response
     * @throws ApiError
     */
    public messageContactUs({
        requestBody,
        locale,
    }: {
        requestBody: MessageCreate,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_MessageVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/message/contact-us/',
            query: {
                'locale': locale,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
