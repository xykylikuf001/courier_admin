/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FaviconService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Favicon
     * @returns any Successful Response
     * @throws ApiError
     */
    public favicon({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/favicon.ico',
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
