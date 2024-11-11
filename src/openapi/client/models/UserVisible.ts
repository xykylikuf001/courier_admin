/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExternalAccountVisible } from './ExternalAccountVisible';
import type { FileVisible } from './FileVisible';
import type { WalletVisible } from './WalletVisible';
export type UserVisible = {
    id: string;
    name: string;
    username: string;
    email?: (string | null);
    emailVerifiedAt?: (string | null);
    createdAt: string;
    isStaff: boolean;
    isActive: boolean;
    birthday?: (string | null);
    wallet?: (WalletVisible | null);
    external_accounts?: Array<ExternalAccountVisible>;
    image?: (FileVisible | null);
};

