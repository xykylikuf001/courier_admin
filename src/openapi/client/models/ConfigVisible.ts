/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfigTranslationVisible } from './ConfigTranslationVisible';
export type ConfigVisible = {
    phones: Array<string>;
    emails: Array<string>;
    supportPhone?: (string | null);
    supportEmail?: (string | null);
    regularShippingPrice: string;
    expressShippingPrice: string;
    translations?: (Array<ConfigTranslationVisible> | null);
};

