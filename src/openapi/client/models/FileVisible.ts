/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChoiceBase_ContentTypeChoices_ } from './ChoiceBase_ContentTypeChoices_';
import type { ChoiceBase_FileTypeChoices_ } from './ChoiceBase_FileTypeChoices_';
export type FileVisible = {
    id: number;
    fileType: ChoiceBase_FileTypeChoices_;
    filePath: string;
    fileHost: (string | null);
    contentType: ChoiceBase_ContentTypeChoices_;
    fileUrl?: (string | null);
    poster?: (string | null);
    width?: (number | null);
    height?: (number | null);
    caption?: (string | null);
};

