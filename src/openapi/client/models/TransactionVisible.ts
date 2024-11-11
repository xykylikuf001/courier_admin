/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChoiceBase_TransactionKindChoices_ } from './ChoiceBase_TransactionKindChoices_';
export type TransactionVisible = {
    id: number;
    token: string;
    kind: ChoiceBase_TransactionKindChoices_;
    isSuccess: boolean;
    isActionRequired: boolean;
    currency: string;
    amount: string;
    error?: (string | null);
    customerId: (string | null);
    gatewayResponse: Record<string, any>;
    isAlreadyProcessed: boolean;
    createdAt: string;
    paymentId: number;
};

