/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserTypeChoices } from './UserTypeChoices';
export type UserCreate = {
    email: string;
    emailVerifiedAt?: (string | null);
    phone?: (string | null);
    phoneVerifiedAt?: (string | null);
    name: string;
    password: string;
    isStaff?: (boolean | null);
    isActive?: (boolean | null);
    userType?: (UserTypeChoices | null);
};

