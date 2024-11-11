/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChoiceBase_ChargeStatusChoices_ } from './ChoiceBase_ChargeStatusChoices_';
import type { ChoiceBase_PaymentTypeChoices_ } from './ChoiceBase_PaymentTypeChoices_';
import type { ChoiceBase_StorePaymentMethodChoices_ } from './ChoiceBase_StorePaymentMethodChoices_';
import type { PaymentAttachmentVisible } from './PaymentAttachmentVisible';
import type { PaymentStaff } from './PaymentStaff';
import type { TransactionVisible } from './TransactionVisible';
export type PaymentVisible = {
    id: number;
    walletId: (string | null);
    staffId: (string | null);
    paymentType: ChoiceBase_PaymentTypeChoices_;
    gateway: string;
    isActive: boolean;
    toConfirm: boolean;
    chargeStatus: ChoiceBase_ChargeStatusChoices_;
    token?: (string | null);
    totalAmount: string;
    capturedAmount: string;
    currency: string;
    storePaymentMethod: ChoiceBase_StorePaymentMethodChoices_;
    ccFirstDigits: (string | null);
    ccLastDigits: (string | null);
    ccBrand: (string | null);
    ccExpMonth: (string | null);
    ccExpYear: (string | null);
    paymentMethodType: (string | null);
    customerIpAddress: (string | null);
    extraData: (Record<string, any> | null);
    returnUrl: (string | null);
    pspReference: (string | null);
    createdAt: string;
    privateMetadata: Record<string, any>;
    publicMetadata: Record<string, any>;
    staff?: (PaymentStaff | null);
    transactions?: (Array<TransactionVisible> | null);
    attachments?: (Array<PaymentAttachmentVisible> | null);
};

