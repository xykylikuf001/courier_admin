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
        lang,
        page,
        limit,
    }: {
        orderBy?: ('id' | '-id' | null),
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_FileVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/file/',
            query: {
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
     * File-Upload
     * @returns IResponseBase_FileVisible_ Successful Response
     * @throws ApiError
     */
    public fileUpload({
        formData,
        lang,
    }: {
        formData: Body_file_upload,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_FileVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/file/create/upload/',
            query: {
                'lang': lang,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
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
        lang,
    }: {
        objId: number,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<FileVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/file/{obj_id}/detail/',
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
     * File-Update
     * @returns IResponseBase_FileVisible_ Successful Response
     * @throws ApiError
     */
    public fileUpdate({
        objId,
        requestBody,
        lang,
    }: {
        objId: number,
        requestBody: FileBase,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_FileVisible_> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/file/{obj_id}/update/',
            path: {
                'obj_id': objId,
            },
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
    /**
     * File-Delete
     * @returns void
     * @throws ApiError
     */
    public fileDelete({
        objId,
        lang,
    }: {
        objId: number,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/file/{obj_id}/delete/',
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
     * File-Public-List
     * @returns IPaginationDataBase_FileVisible_ Successful Response
     * @throws ApiError
     */
    public filePublicList({
        orderBy,
        lang,
        page,
        limit,
    }: {
        orderBy?: ('id' | '-id' | null),
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_FileVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/file/public/',
            query: {
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
}
