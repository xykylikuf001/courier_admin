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
        lang,
        page,
        limit,
    }: {
        search?: (string | null),
        isRead?: (boolean | null),
        orderBy?: ('id' | '-id' | null),
        lang?: (LanguagesChoices | null),
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
     * Message-Detail
     * @returns MessageVisible Successful Response
     * @throws ApiError
     */
    public messageDetail({
        objId,
        lang,
    }: {
        objId: number,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<MessageVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/message/{obj_id}/detail/',
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
     * Message-Contact-Us
     * @returns IResponseBase_MessageVisible_ Successful Response
     * @throws ApiError
     */
    public messageContactUs({
        requestBody,
        lang,
    }: {
        requestBody: MessageCreate,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_MessageVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/message/contact-us/',
            query: {
                'lang': lang,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
