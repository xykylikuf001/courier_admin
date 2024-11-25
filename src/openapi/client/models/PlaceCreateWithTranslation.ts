/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LanguagesChoices } from './LanguagesChoices';
import type { PlaceLevelChoices } from './PlaceLevelChoices';
export type PlaceCreateWithTranslation = {
    slug: (string | null);
    locationLevel: (PlaceLevelChoices | null);
    parentId?: (number | null);
    name: string;
    fullName?: (string | null);
    locale: LanguagesChoices;
};

