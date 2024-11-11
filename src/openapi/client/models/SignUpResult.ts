/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserVisible } from './UserVisible';
export type SignUpResult = {
    user: UserVisible;
    access_token: string;
    token_type: string;
    refresh_token?: (string | null);
};

