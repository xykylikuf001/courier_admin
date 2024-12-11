/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_release_upload } from '../models/Body_release_upload';
import type { IResponseBase_str_ } from '../models/IResponseBase_str_';
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
        locale,
    }: {
        apkVersion: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/android-release/{apk_version}/',
            path: {
                'apk_version': apkVersion,
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
     * Release-Upload
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public releaseUpload({
        formData,
        locale,
    }: {
        formData: Body_release_upload,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/release/upload/',
            query: {
                'locale': locale,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Release-File-List
     * @returns any Successful Response
     * @throws ApiError
     */
    public releaseFileList({
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/release/file/list/',
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
     * Release-File-Delete
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public releaseFileDelete({
        version,
        releaseOs,
        locale,
    }: {
        version: string,
        releaseOs: 'android' | 'ios',
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/release/file/delete/',
            query: {
                'version': version,
                'release_os': releaseOs,
                'locale': locale,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
