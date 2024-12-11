/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChoiceBase_LanguagesChoices_ } from './ChoiceBase_LanguagesChoices_';
import type { ChoiceBase_PlaceLevelChoices_ } from './ChoiceBase_PlaceLevelChoices_';
export type PlaceVisible = {
    id: number;
    slug: string;
    name?: (string | null);
    fullName?: (string | null);
    locationLevel: ChoiceBase_PlaceLevelChoices_;
    locale?: (ChoiceBase_LanguagesChoices_ | null);
    parentId?: (number | null);
    treeId?: (number | null);
    left: number;
    right: number;
    level: number;
    isActive: boolean;
    hasChildren: boolean;
};

