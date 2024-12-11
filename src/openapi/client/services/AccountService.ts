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
import type { PasswordIn } from '../models/PasswordIn';
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
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_Union_UserSessionVisible__NoneType__> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/logout/',
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
     * Get-Token
     * Get token from external api
     * @returns Token Successful Response
     * @throws ApiError
     */
    public getToken({
        formData,
        locale,
    }: {
        formData: Body_get_token,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/get-token/',
            query: {
                'locale': locale,
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
        locale,
    }: {
        requestBody: AuthPhone,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/get-token/by-phone/',
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
     * Verify-Token
     * @returns boolean Successful Response
     * @throws ApiError
     */
    public verifyToken({
        requestBody,
        locale,
    }: {
        requestBody: VerifyToken,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<boolean> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/verify-token/',
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
     * Auth-Sessions
     * @returns UserSessionVisible Successful Response
     * @throws ApiError
     */
    public authSessions({
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<Array<UserSessionVisible>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/sessions/',
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
     * Auth-Session-Revoke-All
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public authSessionRevokeAll({
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/sessions/revoke-all/',
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
     * Auth-Session-Revoke
     * @returns IResponseBase_UserSessionVisible_ Successful Response
     * @throws ApiError
     */
    public authSessionRevoke({
        objId,
        locale,
    }: {
        objId: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserSessionVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/sessions/{obj_id}/revoke/',
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
     * Me
     * @returns UserVisible Successful Response
     * @throws ApiError
     */
    public me({
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<UserVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/me/',
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
     * Sign-Up
     * @returns IResponseBase_SignUpResult_ Successful Response
     * @throws ApiError
     */
    public signUp({
        requestBody,
        locale,
    }: {
        requestBody: SignUpIn,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_SignUpResult_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/sign-up/',
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
     * Auth-By-Google
     * @returns IResponseBase_Token_ Successful Response
     * @throws ApiError
     */
    public authByGoogle({
        code,
        scope,
        authuser,
        prompt,
        locale,
    }: {
        code: string,
        scope: string,
        authuser: string,
        prompt: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_Token_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/google/callback/',
            query: {
                'code': code,
                'scope': scope,
                'authuser': authuser,
                'prompt': prompt,
                'locale': locale,
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
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_PhoneVerify_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/phone/verify/send/',
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
     * Auth-Phone-Verify
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public authPhoneVerify({
        code,
        locale,
    }: {
        code: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/phone/verify/confirm/',
            query: {
                'code': code,
                'locale': locale,
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
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/auth/email/verify/send/',
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
     * Auth-Email-Verify
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public authEmailVerify({
        code,
        locale,
    }: {
        code: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/auth/email/verify/confirm/',
            query: {
                'code': code,
                'locale': locale,
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
        locale,
        page,
        limit,
    }: {
        userId?: (string | null),
        search?: (string | null),
        orderBy?: ('created_at' | '-created_at' | null),
        locale?: (LanguagesChoices | null),
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
     * User-Count
     * @returns number Successful Response
     * @throws ApiError
     */
    public userCount({
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/count/',
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
     * User-Create
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public userCreate({
        requestBody,
        locale,
    }: {
        requestBody: UserCreate,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/user/create/',
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
     * User-Detail
     * @returns UserVisible Successful Response
     * @throws ApiError
     */
    public userDetail({
        objId,
        locale,
    }: {
        objId: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<UserVisible> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/{obj_id}/detail/',
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
     * User-Update
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public userUpdate({
        objId,
        requestBody,
        locale,
    }: {
        objId: string,
        requestBody: UserBase,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/user/{obj_id}/update/',
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
     * User-Delete
     * @returns void
     * @throws ApiError
     */
    public userDelete({
        objId,
        locale,
    }: {
        objId: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/user/{obj_id}/delete/',
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
     * User-Phone-Verify-Manual
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public userPhoneVerifyManual({
        objId,
        locale,
    }: {
        objId: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/phone/verify/manual/',
            query: {
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
     * User-Phone-Verify-Get-Code
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public userPhoneVerifyGetCode({
        phone,
        locale,
    }: {
        phone: string,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/phone/verify/get-code/',
            query: {
                'phone': phone,
                'locale': locale,
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
        locale,
    }: {
        formData: Body_user_profile_update,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/profile/update/',
            query: {
                'locale': locale,
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
     * Staff-Change-Password
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public staffChangePassword({
        requestBody,
        locale,
    }: {
        requestBody: PasswordIn,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/staff/change-password/',
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
     * User-Profile-Change-Password
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public userProfileChangePassword({
        requestBody,
        locale,
    }: {
        requestBody: ProfilePasswordIn,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/profile/change-password/',
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
     * User-Profile-Change-Password-Code
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public userProfileChangePasswordCode({
        locale,
    }: {
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/profile/change-password/code/',
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
     * User-Profile-Set-Email
     * @returns IResponseBase_UserVisible_ Successful Response
     * @throws ApiError
     */
    public userProfileSetEmail({
        formData,
        locale,
    }: {
        formData: Body_user_profile_set_email,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_UserVisible_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/profile/set-email/',
            query: {
                'locale': locale,
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
        locale,
    }: {
        requestBody: ProfileChangeEmail,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/profile/change-email/',
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
     * User-Profile-Forgot-Password
     * @returns IResponseBase_str_ Successful Response
     * @throws ApiError
     */
    public userProfileForgotPassword({
        formData,
        locale,
    }: {
        formData: Body_user_profile_forgot_password,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/profile/forgot-password/',
            query: {
                'locale': locale,
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
        locale,
    }: {
        requestBody: ResetPassword,
        locale?: (LanguagesChoices | null),
    }): CancelablePromise<IResponseBase_str_> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/profile/reset-password/',
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
}
