/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Represents if and how a payment should be stored in a payment gateway.
 *
 * The following store types are possible:
 * - ON_SESSION - the payment is stored only to be reused when
 * the customer is present in the checkout flow
 * - OFF_SESSION - the payment is stored to be reused even if
 * the customer is absent
 * - NONE - the payment is not stored.
 */
export enum StorePaymentMethodChoices {
    ON_SESSION = 'ON_SESSION',
    OFF_SESSION = 'OFF_SESSION',
    NONE = 'NONE',
}
