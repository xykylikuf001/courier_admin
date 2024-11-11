/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IPaginationDataBase_LobbyVisible_ } from '../models/IPaginationDataBase_LobbyVisible_';
import type { IResponseBase_LobbyVisible_ } from '../models/IResponseBase_LobbyVisible_';
import type { IResponseBase_str_ } from '../models/IResponseBase_str_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { LobbyBase } from '../models/LobbyBase';
import type { LobbyCreate } from '../models/LobbyCreate';
import type { LobbyUserCreate } from '../models/LobbyUserCreate';
import type { LobbyVisibleExtended } from '../models/LobbyVisibleExtended';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class LobbyService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Lobby-List
     * @returns IPaginationDataBase_LobbyVisible_ Successful Response
     * @throws ApiError
     */
    public lobbyList({
        lang,
        page,
        limit,
    }: {
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_LobbyVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/lobby/',
            query: {
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
     * Lobby-Create
     * @returns IResponseBase_LobbyVisible_ Successful Response
     * @throws ApiError
     */
    public lobbyCreate({
        requestBody,
        lang,
    }: {
        requestBody: LobbyCreate,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_LobbyVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/lobby/create/',
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
     * Lobby-Detail
     * @returns LobbyVisibleExtended Successful Response
     * @throws ApiError
     */
    public lobbyDetail({
        objId,
        lang,
    }: {
        objId: number,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<LobbyVisibleExtended> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/lobby/{obj_id}/detail/',
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
     * Lobby-Update
     * @returns IResponseBase_LobbyVisible_ Successful Response
     * @throws ApiError
     */
    public lobbyUpdate({
        objId,
        requestBody,
        lang,
    }: {
        objId: number,
        requestBody: LobbyBase,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_LobbyVisible_> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/lobby/{obj_id}/update/',
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
     * Lobby-Delete
     * @returns void
     * @throws ApiError
     */
    public lobbyDelete({
        objId,
        lang,
    }: {
        objId: number,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/lobby/{obj_id}/delete/',
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
     * Lobby-Add-User
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public lobbyAddUser({
        requestBody,
        lang,
    }: {
        requestBody: LobbyUserCreate,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/lobby/add-user/',
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
