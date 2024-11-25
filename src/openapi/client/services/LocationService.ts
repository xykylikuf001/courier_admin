/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IPaginationDataBase_PlaceVisible_ } from '../models/IPaginationDataBase_PlaceVisible_';
import type { IResponseBase_PlaceVisible_ } from '../models/IResponseBase_PlaceVisible_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { PlaceCreateWithTranslation } from '../models/PlaceCreateWithTranslation';
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
        orderBy,
        lang,
        page,
        limit,
    }: {
        orderBy?: ('id' | '-id' | null),
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_PlaceVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/location/',
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
     * Place-Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public placeCount({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/location/count/',
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
     * Place-Create
     * @returns IResponseBase_PlaceVisible_ Successful Response
     * @throws ApiError
     */
    public placeCreate({
        requestBody,
        lang,
    }: {
        requestBody: PlaceCreateWithTranslation,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_PlaceVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/location/create/',
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
}
