/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthPhone } from '../models/AuthPhone';
import type { Body_get_token } from '../models/Body_get_token';
import type { Body_user_profile_forgot_password } from '../models/Body_user_profile_forgot_password';
import type { Body_user_profile_set_email } from '../models/Body_user_profile_set_email';
import type { Body_user_profile_update } from '../models/Body_user_profile_update';
import type { IPaginationDataBase_UserVisible_ } from '../models/IPaginationDataBase_UserVisible_';
import type { IResponseBase_PhoneVerify_ } from '../models/IResponseBase_PhoneVerify_';
import type { IResponseBase_SignUpResult_ } from '../models/IResponseBase_SignUpResult_';
import type { IResponseBase_str_ } from '../models/IResponseBase_str_';
import type { IResponseBase_Token_ } from '../models/IResponseBase_Token_';
import type { IResponseBase_Union_UserSessionVisible__NoneType__ } from '../models/IResponseBase_Union_UserSessionVisible__NoneType__';
import type { IResponseBase_UserSessionVisible_ } from '../models/IResponseBase_UserSessionVisible_';
import type { IResponseBase_UserVisible_ } from '../models/IResponseBase_UserVisible_';
import type { LanguagesChoices } from '../models/LanguagesChoices';
import type { ProfileChangeEmail } from '../models/ProfileChangeEmail';
import type { ProfilePasswordIn } from '../models/ProfilePasswordIn';
import type { ResetPassword } from '../models/ResetPassword';
import type { SignUpIn } from '../models/SignUpIn';
import type { Token } from '../models/Token';
import type { UserBase } from '../models/UserBase';
import type { UserCreate } from '../models/UserCreate';
import type { UserSessionVisible } from '../models/UserSessionVisible';
import type { UserVisible } from '../models/UserVisible';
import type { VerifyToken } from '../models/VerifyToken';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AccountService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Logout
     * @returns IResponseBase_Union_UserSessionVisible__NoneType__ Successful Response
     * @throws ApiError
     */
    public logout({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_Union_UserSessionVisible__NoneType__> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/logout/',
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
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get-Token-By-Phone
     * @returns Token Successful Response
     * @throws ApiError
     */
    public getTokenByPhone({
        requestBody,
        lang,
    }: {
        requestBody: AuthPhone,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/get-token/by-phone/',
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
    /**
     * Verify-Token
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public verifyToken({
        requestBody,
        lang,
    }: {
        requestBody: VerifyToken,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<boolean> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/verify-token/',
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
                400: `Bad Request`,
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
                400: `Bad Request`,
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
                400: `Bad Request`,
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
                400: `Bad Request`,
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
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Auth-By-Google
     * @returns IResponseBase_Token_ Successful Response
     * @throws ApiError
     */
    public authByGoogle({
        code,
        scope,
        authuser,
        prompt,
        lang,
    }: {
        code: string,
        scope: string,
        authuser: string,
        prompt: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_Token_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/google/callback/',
            query: {
                'code': code,
                'scope': scope,
                'authuser': authuser,
                'prompt': prompt,
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Auth-Phone-Verify-Send
     * @returns IResponseBase_PhoneVerify_ Successful Response
     * @throws ApiError
     */
    public authPhoneVerifySend({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_PhoneVerify_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/phone/verify/send/',
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
     * Auth-Phone-Verify
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public authPhoneVerify({
        code,
        lang,
    }: {
        code: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/phone/verify/confirm/',
            query: {
                'code': code,
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Auth-Email-Verify-Send
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public authEmailVerifySend({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/email/verify/send/',
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
     * Auth-Email-Verify
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public authEmailVerify({
        code,
        lang,
    }: {
        code: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/email/verify/confirm/',
            query: {
                'code': code,
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
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
        orderBy,
        lang,
        page,
        limit,
    }: {
        userId?: (string | null),
        search?: (string | null),
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
                400: `Bad Request`,
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
                400: `Bad Request`,
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
                400: `Bad Request`,
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
                400: `Bad Request`,
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
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * User-Phone-Verify-Manual
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public userPhoneVerifyManual({
        objId,
        lang,
    }: {
        objId: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/phone/verify/manual/',
            query: {
                'obj_id': objId,
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * User-Phone-Verify-Get-Code
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public userPhoneVerifyGetCode({
        phone,
        lang,
    }: {
        phone: string,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/phone/verify/get-code/',
            query: {
                'phone': phone,
                'lang': lang,
            },
            errors: {
                400: `Bad Request`,
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
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
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
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * User-Profile-Change-Password-Code
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public userProfileChangePasswordCode({
        lang,
    }: {
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/profile/change-password/code/',
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
     * User-Profile-Set-Email
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public userProfileSetEmail({
        formData,
        lang,
    }: {
        formData: Body_user_profile_set_email,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/profile/set-email/',
            query: {
                'lang': lang,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * User-Profile-Change-Email
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public userProfileChangeEmail({
        requestBody,
        lang,
    }: {
        requestBody: ProfileChangeEmail,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/profile/change-email/',
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
    /**
     * User-Profile-Forgot-Password
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public userProfileForgotPassword({
        formData,
        lang,
    }: {
        formData: Body_user_profile_forgot_password,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/profile/forgot-password/',
            query: {
                'lang': lang,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * User-Profile-Reset-Password
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public userProfileResetPassword({
        requestBody,
        lang,
    }: {
        requestBody: ResetPassword,
        lang?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/profile/reset-password/',
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
