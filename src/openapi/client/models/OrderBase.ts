/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderStatusChoices } from './OrderStatusChoices';
import type { ShippingTypeChoices } from './ShippingTypeChoices';
export type OrderBase = {
    code?: (string | null);
    status?: (OrderStatusChoices | null);
    senderName?: (string | null);
    senderPhone?: (string | null);
    receiverName?: (string | null);
    receiverPhone?: (string | null);
    billingAddress?: (string | null);
    shippingAddress?: (string | null);
    note?: (string | null);
    weight?: (string | null);
    price?: (number | string | null);
    shippingAmount?: (number | string | null);
    shippingType?: (ShippingTypeChoices | null);
    completedAt?: (string | null);
};

