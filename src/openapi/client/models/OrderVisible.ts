/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChoiceBase_OrderStatusChoices_ } from './ChoiceBase_OrderStatusChoices_';
import type { ChoiceBase_ShippingTypeChoices_ } from './ChoiceBase_ShippingTypeChoices_';
import type { OrderUser } from './OrderUser';
export type OrderVisible = {
    id: string;
    code?: (string | null);
    status: ChoiceBase_OrderStatusChoices_;
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    billingAddress: string;
    shippingAddress: string;
    createdAt: string;
    completedAt?: (string | null);
    shippingType: ChoiceBase_ShippingTypeChoices_;
    shippingAmount?: (string | null);
    price?: (string | null);
    weight?: (string | null);
    note?: (string | null);
    user?: (OrderUser | null);
};

