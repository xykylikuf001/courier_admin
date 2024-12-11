/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IPaginationDataBase_PlaceTranslationVisible_ } from '../models/IPaginationDataBase_PlaceTranslationVisible_';
import type { IPaginationDataBase_PlaceVisible_ } from '../models/IPaginationDataBase_PlaceVisible_';
import type { IResponseBase_PlaceTranslationVisible_ } from '../models/IResponseBase_PlaceTranslationVisible_';
import type { IResponseBase_PlaceVisible_ } from '../models/IResponseBase_PlaceVisible_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { PlaceBase } from '../models/PlaceBase';
import type { PlaceCreateWithTranslation } from '../models/PlaceCreateWithTranslation';
import type { PlaceTranslationBase } from '../models/PlaceTranslationBase';
import type { PlaceTranslationCreate } from '../models/PlaceTranslationCreate';
import type { PlaceTranslationVisible } from '../models/PlaceTranslationVisible';
import type { PlaceVisible } from '../models/PlaceVisible';
import type { PlaceVisibleExtended } from '../models/PlaceVisibleExtended';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class LocationService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Place-List
     * @returns IPaginationDataBase_PlaceVisible_ Successful Response
     * @throws ApiError
     */
    public placeList({
        lang,
        orderBy,
        locale,
        page,
        limit,
    }: {
        lang?: (LanguagesChoices | null),
        orderBy?: ('id' | '-id' | null),
        locale?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_PlaceVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/location/',
            query: {
                'lang': lang,
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
     * Place-Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public placeCount({
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/location/count/',
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
     * Place-Create
     * @returns IResponseBase_PlaceVisible_ Successful Response
     * @throws ApiError
     */
    public placeCreate({
        requestBody,
        locale,
    }: {
        requestBody: PlaceCreateWithTranslation,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_PlaceVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/location/create/',
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
     * Place-Detail
     * @returns PlaceVisibleExtended Successful Response
     * @throws ApiError
     */
    public placeDetail({
        objId,
        lang,
        locale,
    }: {
        objId: number,
        lang?: (LanguagesChoices | null),
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<PlaceVisibleExtended> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/location/{obj_id}/detail/',
            path: {
                'obj_id': objId,
            },
            query: {
                'lang': lang,
                'locale': locale,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Place-Update
     * @returns IResponseBase_PlaceVisible_ Successful Response
     * @throws ApiError
     */
    public placeUpdate({
        objId,
        requestBody,
        locale,
    }: {
        objId: number,
        requestBody: PlaceBase,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_PlaceVisible_> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/location/{obj_id}/update/',
            path: {
                'obj_id': objId,
            },
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
     * Place-Translations
     * @returns IPaginationDataBase_PlaceTranslationVisible_ Successful Response
     * @throws ApiError
     */
    public placeTranslations({
        objId,
        orderBy,
        locale,
        page,
        limit,
    }: {
        objId: number,
        orderBy?: ('locale' | '-locale' | null),
        locale?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_PlaceTranslationVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/location/{obj_id}/translations/',
            path: {
                'obj_id': objId,
            },
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
     * Place-Tr-Create
     * @returns IResponseBase_PlaceTranslationVisible_ Successful Response
     * @throws ApiError
     */
    public placeTrCreate({
        objId,
        requestBody,
        locale,
    }: {
        objId: number,
        requestBody: PlaceTranslationCreate,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_PlaceTranslationVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/location/{obj_id}/translations/create/',
            path: {
                'obj_id': objId,
            },
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
     * Place-Tr-Detail
     * @returns PlaceTranslationVisible Successful Response
     * @throws ApiError
     */
    public placeTrDetail({
        objId,
        objLocale,
        locale,
    }: {
        objId: number,
        objLocale: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<PlaceTranslationVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/location/{obj_id}/translations/{obj_locale}/detail/',
            path: {
                'obj_id': objId,
                'obj_locale': objLocale,
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
     * Place-Tr-Update
     * @returns IResponseBase_PlaceTranslationVisible_ Successful Response
     * @throws ApiError
     */
    public placeTrUpdate({
        objId,
        objLocale,
        requestBody,
        locale,
    }: {
        objId: number,
        objLocale: string,
        requestBody: PlaceTranslationBase,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_PlaceTranslationVisible_> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/location/{obj_id}/translations/{obj_locale}/update/',
            path: {
                'obj_id': objId,
                'obj_locale': objLocale,
            },
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
     * Place-Tr-Delete
     * @returns void
     * @throws ApiError
     */
    public placeTrDelete({
        objId,
        locale,
    }: {
        objId: number,
        locale: (LanguagesChoices | null),
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/location/{obj_id}/translations/{locale}/delete/',
            path: {
                'obj_id': objId,
                'locale': locale,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Place-Public-List
     * @returns IPaginationDataBase_PlaceVisible_ Successful Response
     * @throws ApiError
     */
    public placePublicList({
        search,
        parentId,
        orderBy,
        locale,
        page,
        limit,
    }: {
        search?: (string | null),
        parentId?: (number | null),
        orderBy?: ('id' | '-id' | null),
        locale?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_PlaceVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/location/public/list/',
            query: {
                'search': search,
                'parent_id': parentId,
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
     * Place-Public-Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public placePublicCount({
        search,
        parentId,
        locale,
    }: {
        search?: (string | null),
        parentId?: (number | null),
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/location/public/count/',
            query: {
                'search': search,
                'parent_id': parentId,
                'locale': locale,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Place-Public-Detail
     * @returns PlaceVisible Successful Response
     * @throws ApiError
     */
    public placePublicDetail({
        slugIn,
        locale,
    }: {
        slugIn: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<PlaceVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/location/public/{slug_in}/detail/',
            path: {
                'slug_in': slugIn,
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
}
