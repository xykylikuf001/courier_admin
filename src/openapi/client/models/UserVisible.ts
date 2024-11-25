/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChoiceBase_UserTypeChoices_ } from './ChoiceBase_UserTypeChoices_';
import type { ExternalAccountVisible } from './ExternalAccountVisible';
import type { UserSessionVisible } from './UserSessionVisible';
export type UserVisible = {
    id: string;
    name: string;
    email?: (string | null);
    emailVerifiedAt?: (string | null);
    phone?: (string | null);
    phoneVerifiedAt?: (string | null);
    createdAt: string;
    isStaff: boolean;
    isActive: boolean;
    userType: ChoiceBase_UserTypeChoices_;
    externalAccounts?: Array<ExternalAccountVisible>;
    sessions?: Array<UserSessionVisible>;
};

