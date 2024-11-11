/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChoiceBase_LobbyStatusChoices_ } from './ChoiceBase_LobbyStatusChoices_';
import type { ChoiceBase_LobbyTypeChoices_ } from './ChoiceBase_LobbyTypeChoices_';
export type LobbyVisible = {
    id: number;
    startAt: (string | null);
    telegramGroup: (string | null);
    status: ChoiceBase_LobbyStatusChoices_;
    stakeAmount: string;
    totalAmount: string;
    priceAmount: string;
    feeAmount: string;
    currency: string;
    isPaid: boolean;
    lobbyType: ChoiceBase_LobbyTypeChoices_;
    createdAt: string;
};

