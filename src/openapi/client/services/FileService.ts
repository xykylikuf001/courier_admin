/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_file_upload } from '../models/Body_file_upload';
import type { FileBase } from '../models/FileBase';
import type { FileVisible } from '../models/FileVisible';
import type { IPaginationDataBase_FileVisible_ } from '../models/IPaginationDataBase_FileVisible_';
import type { IResponseBase_FileVisible_ } from '../models/IResponseBase_FileVisible_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FileService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * File-List
     * @returns IPaginationDataBase_FileVisible_ Successful Response
     * @throws ApiError
     */
    public fileList({
        orderBy,
        locale,
        page,
        limit,
    }: {
        orderBy?: ('id' | '-id' | null),
        locale?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_FileVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/file/',
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
     * File-Upload
     * @returns IResponseBase_FileVisible_ Successful Response
     * @throws ApiError
     */
    public fileUpload({
        formData,
        locale,
    }: {
        formData: Body_file_upload,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_FileVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/file/create/upload/',
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
     * File-Detail
     * @returns FileVisible Successful Response
     * @throws ApiError
     */
    public fileDetail({
        objId,
        locale,
    }: {
        objId: number,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<FileVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/file/{obj_id}/detail/',
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
     * File-Update
     * @returns IResponseBase_FileVisible_ Successful Response
     * @throws ApiError
     */
    public fileUpdate({
        objId,
        requestBody,
        locale,
    }: {
        objId: number,
        requestBody: FileBase,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_FileVisible_> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/file/{obj_id}/update/',
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
     * File-Delete
     * @returns void
     * @throws ApiError
     */
    public fileDelete({
        objId,
        locale,
    }: {
        objId: number,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/file/{obj_id}/delete/',
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
     * File-Public-List
     * @returns IPaginationDataBase_FileVisible_ Successful Response
     * @throws ApiError
     */
    public filePublicList({
        orderBy,
        locale,
        page,
        limit,
    }: {
        orderBy?: ('id' | '-id' | null),
        locale?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_FileVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/file/public/',
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
}
