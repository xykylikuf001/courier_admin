/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserTypeChoices } from './UserTypeChoices';
export type UserBase = {
    email?: (string | null);
    emailVerifiedAt?: (string | null);
    phone?: (string | null);
    phoneVerifiedAt?: (string | null);
    name?: (string | null);
    password?: (string | null);
    isStaff?: (boolean | null);
    isActive?: (boolean | null);
    userType?: (UserTypeChoices | null);
};

