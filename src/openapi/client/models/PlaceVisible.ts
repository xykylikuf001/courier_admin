/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChoiceBase_LanguagesChoices_ } from './ChoiceBase_LanguagesChoices_';
export type PlaceVisible = {
    id: number;
    slug: string;
    name?: (string | null);
    fullName?: (string | null);
    locale?: (ChoiceBase_LanguagesChoices_ | null);
    parentId?: (number | null);
    treeId?: (number | null);
    left: number;
    right: number;
    level: number;
};

