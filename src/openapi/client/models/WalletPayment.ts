/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChoiceBase_ChargeStatusChoices_ } from './ChoiceBase_ChargeStatusChoices_';
import type { ChoiceBase_PaymentTypeChoices_ } from './ChoiceBase_PaymentTypeChoices_';
export type WalletPayment = {
    id: number;
    paymentType: ChoiceBase_PaymentTypeChoices_;
    chargeStatus: ChoiceBase_ChargeStatusChoices_;
    gateway: string;
    totalAmount: string;
    capturedAmount: string;
    currency: string;
    createdAt: string;
};

