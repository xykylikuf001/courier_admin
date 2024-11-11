/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Represents possible statuses of a payment.
 *
 * The following statuses are possible:
 * - NOT_CHARGED - no funds were take off the customer founding source yet.
 * - PARTIALLY_CHARGED - funds were taken off the customer's funding source,
 * partly covering the payment amount.
 * - FULLY_CHARGED - funds were taken off the customer founding source,
 * partly or completely covering the payment amount.
 * - PARTIALLY_REFUNDED - part of charged funds were returned to the customer.
 * - FULLY_REFUNDED - all charged funds were returned to the customer.
 */
export enum ChargeStatusChoices {
    NOT_CHARGED = 'NOT_CHARGED',
    PENDING = 'PENDING',
    PARTIALLY_CHARGED = 'PARTIALLY_CHARGED',
    FULLY_CHARGED = 'FULLY_CHARGED',
    PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
    FULLY_REFUNDED = 'FULLY_REFUNDED',
    REFUSED = 'REFUSED',
    CANCELLED = 'CANCELLED',
}
