/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Represents the type of transaction.
 *
 * The following transactions types are possible:
 * - AUTH - an amount reserved against the customer's funding source. Money
 * does not change hands until the authorization is captured.
 * - VOID - a cancellation of a pending authorization or capture.
 * - CAPTURE - a transfer of the money that was reserved during the
 * authorization stage.
 * - REFUND - full or partial return of captured funds to the customer.
 */
export enum TransactionKindChoices {
    EXTERNAL = 'EXTERNAL',
    AUTH = 'AUTH',
    CHECK_STATUS = 'CHECK_STATUS',
    CAPTURE = 'CAPTURE',
    CAPTURE_FAILED = 'CAPTURE_FAILED',
    ACTION_TO_CONFIRM = 'ACTION_TO_CONFIRM',
    VOID = 'VOID',
    PENDING = 'PENDING',
    REFUND = 'REFUND',
    REFUND_ONGOING = 'REFUND_ONGOING',
    REFUND_FAILED = 'REFUND_FAILED',
    REFUND_REVERSED = 'REFUND_REVERSED',
    CONFIRM = 'CONFIRM',
    CANCEL = 'CANCEL',
}
