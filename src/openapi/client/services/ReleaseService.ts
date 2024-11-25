/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ReleaseService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Release
     * @returns any Successful Response
     * @throws ApiError
     */
    public release({
        apkVersion,
        lang,
    }: {
        apkVersion: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/android-release/{apk_version}/',
            path: {
                'apk_version': apkVersion,
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
