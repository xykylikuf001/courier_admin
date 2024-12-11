/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfigCreate } from '../models/ConfigCreate';
import type { ConfigTranslationBase } from '../models/ConfigTranslationBase';
import type { ConfigTranslationCreate } from '../models/ConfigTranslationCreate';
import type { ConfigTranslationVisible } from '../models/ConfigTranslationVisible';
import type { ConfigVisible } from '../models/ConfigVisible';
import type { ConfigVisiblePublic } from '../models/ConfigVisiblePublic';
import type { IPaginationDataBase_ConfigTranslationVisible_ } from '../models/IPaginationDataBase_ConfigTranslationVisible_';
import type { IResponseBase_ConfigTranslationVisible_ } from '../models/IResponseBase_ConfigTranslationVisible_';
import type { IResponseBase_ConfigVisible_ } from '../models/IResponseBase_ConfigVisible_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ConfigService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Config-Detail
     * @returns ConfigVisible Successful Response
     * @throws ApiError
     */
    public configDetail({
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<ConfigVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/config/',
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
     * Config-Manage
     * @returns IResponseBase_ConfigVisible_ Successful Response
     * @throws ApiError
     */
    public configManage({
        requestBody,
        locale,
    }: {
        requestBody: ConfigCreate,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_ConfigVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/config/manage/',
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
    /**
     * Config-Tr-List
     * @returns IPaginationDataBase_ConfigTranslationVisible_ Successful Response
     * @throws ApiError
     */
    public configTrList({
        orderBy,
        locale,
        page,
        limit,
    }: {
        orderBy?: ('id' | '-id' | null),
        locale?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_ConfigTranslationVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/config/translations/',
            query: {
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
     * Config-Tr-Create
     * @returns IResponseBase_ConfigTranslationVisible_ Successful Response
     * @throws ApiError
     */
    public configTrCreate({
        requestBody,
        locale,
    }: {
        requestBody: ConfigTranslationCreate,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_ConfigTranslationVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/config/translations/create/',
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
    /**
     * Config-Tr-Detail
     * @returns ConfigTranslationVisible Successful Response
     * @throws ApiError
     */
    public configTrDetail({
        locale,
    }: {
        locale: (LanguagesChoices | null),
    }): CancelablePromise<ConfigTranslationVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/config/translations/{locale}/detail/',
            path: {
                'locale': locale,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Config-Tr-Update
     * @returns IResponseBase_ConfigTranslationVisible_ Successful Response
     * @throws ApiError
     */
    public configTrUpdate({
        locale,
        requestBody,
    }: {
        locale: (LanguagesChoices | null),
        requestBody: ConfigTranslationBase,
    }): CancelablePromise<IResponseBase_ConfigTranslationVisible_> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/config/translations/{locale}/update/',
            path: {
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
    /**
     * Config-Tr-Delete
     * @returns IResponseBase_ConfigTranslationVisible_ Successful Response
     * @throws ApiError
     */
    public configTrDelete({
        locale,
    }: {
        locale: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_ConfigTranslationVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/config/translations/{locale}/delete/',
            path: {
                'locale': locale,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Config-Public
     * @returns ConfigVisiblePublic Successful Response
     * @throws ApiError
     */
    public configPublic({
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<ConfigVisiblePublic> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/config/public/',
            query: {
                'locale': locale,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
