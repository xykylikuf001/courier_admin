/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingTypeChoices } from './ShippingTypeChoices';
export type OrderCreate = {
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    weight?: (string | null);
    price?: (number | string | null);
    billingAddress: string;
    shippingAddress: string;
    shippingType: ShippingTypeChoices;
    note?: (string | null);
};

