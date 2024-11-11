/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_get_token } from '../models/Body_get_token';
import type { Body_user_profile_update } from '../models/Body_user_profile_update';
import type { IPaginationDataBase_UserVisible_ } from '../models/IPaginationDataBase_UserVisible_';
import type { IResponseBase_SignUpResult_ } from '../models/IResponseBase_SignUpResult_';
import type { IResponseBase_str_ } from '../models/IResponseBase_str_';
import type { IResponseBase_TelegramAuthResponse_ } from '../models/IResponseBase_TelegramAuthResponse_';
import type { IResponseBase_Token_ } from '../models/IResponseBase_Token_';
import type { IResponseBase_UserSessionVisible_ } from '../models/IResponseBase_UserSessionVisible_';
import type { IResponseBase_UserVisible_ } from '../models/IResponseBase_UserVisible_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { ProfilePasswordIn } from '../models/ProfilePasswordIn';
import type { SignUpIn } from '../models/SignUpIn';
import type { TelegramAuth } from '../models/TelegramAuth';
import type { Token } from '../models/Token';
import type { UserBase } from '../models/UserBase';
import type { UserCreate } from '../models/UserCreate';
import type { UserSessionVisible } from '../models/UserSessionVisible';
import type { UserVisible } from '../models/UserVisible';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AccountService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Logout
     * @returns IResponseBase_UserSessionVisible_ Successful Response
     * @throws ApiError
     */
    public logout({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserSessionVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/logout/',
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get-Token
     * Get token from external api
     * @returns Token Successful Response
     * @throws ApiError
     */
    public getToken({
        formData,
        lang,
    }: {
        formData: Body_get_token,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/get-token/',
            query: {
                'lang': lang,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Auth-Sessions
     * @returns UserSessionVisible Successful Response
     * @throws ApiError
     */
    public authSessions({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<Array<UserSessionVisible>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/sessions/',
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Auth-Session-Revoke-All
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public authSessionRevokeAll({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/sessions/revoke-all/',
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Auth-Session-Revoke
     * @returns IResponseBase_UserSessionVisible_ Successful Response
     * @throws ApiError
     */
    public authSessionRevoke({
        objId,
        lang,
    }: {
        objId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserSessionVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/sessions/{obj_id}/revoke/',
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
     * Me
     * @returns UserVisible Successful Response
     * @throws ApiError
     */
    public me({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<UserVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/me/',
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Sign-Up
     * @returns IResponseBase_SignUpResult_ Successful Response
     * @throws ApiError
     */
    public signUp({
        requestBody,
        lang,
    }: {
        requestBody: SignUpIn,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_SignUpResult_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/sign-up/',
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
     * Auth-By-Telegram
     * @returns IResponseBase_TelegramAuthResponse_ Successful Response
     * @throws ApiError
     */
    public authByTelegram({
        requestBody,
        lang,
    }: {
        requestBody: TelegramAuth,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_TelegramAuthResponse_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/telegram/',
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
     * Auth-Telegram-Token
     * @returns IResponseBase_Token_ Successful Response
     * @throws ApiError
     */
    public authTelegramToken({
        code,
        lang,
    }: {
        code: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_Token_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/telegram/{code}/',
            path: {
                'code': code,
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
     * User-List
     * @returns IPaginationDataBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public userList({
        userId,
        search,
        withWallet,
        orderBy,
        lang,
        page,
        limit,
    }: {
        userId?: (string | null),
        search?: (string | null),
        withWallet?: (boolean | null),
        orderBy?: ('created_at' | '-created_at' | null),
        lang?: (LanguagesChoices | null),
        page?: (number | null),
        limit?: (number | null),
    }): CancelablePromise<IPaginationDataBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/',
            query: {
                'user_id': userId,
                'search': search,
                'with_wallet': withWallet,
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
     * User-Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public userCount({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/count/',
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * User-Create
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public userCreate({
        requestBody,
        lang,
    }: {
        requestBody: UserCreate,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/user/create/',
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
     * User-Detail
     * @returns UserVisible Successful Response
     * @throws ApiError
     */
    public userDetail({
        objId,
        lang,
    }: {
        objId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<UserVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{obj_id}/detail/',
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
     * User-Update
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public userUpdate({
        objId,
        requestBody,
        lang,
    }: {
        objId: string,
        requestBody: UserBase,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/user/{obj_id}/update/',
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
     * User-Delete
     * @returns void
     * @throws ApiError
     */
    public userDelete({
        objId,
        lang,
    }: {
        objId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/user/{obj_id}/delete/',
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
     * User-Profile-Update
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public userProfileUpdate({
        formData,
        lang,
    }: {
        formData: Body_user_profile_update,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/profile/update/',
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
     * User-Profile-Change-Password
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public userProfileChangePassword({
        requestBody,
        lang,
    }: {
        requestBody: ProfilePasswordIn,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/profile/change-password/',
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
     * User-Find-By-Telegram-Id
     * @returns UserVisible Successful Response
     * @throws ApiError
     */
    public userFindByTelegramId({
        telegramId,
        lang,
    }: {
        telegramId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<UserVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{telegram_id}/by-telegram-id/',
            path: {
                'telegram_id': telegramId,
            },
            query: {
                'lang': lang,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
