/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WalletPayment } from './WalletPayment';
import type { WalletUser } from './WalletUser';
export type WalletVisibleExtended = {
    id: string;
    currency: string;
    amount: string;
    user: WalletUser;
    createdAt: string;
    privateMetadata: Record<string, any>;
    publicMetadata: Record<string, any>;
    payments: Array<WalletPayment>;
};

