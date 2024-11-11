/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LobbyStatusChoices } from './LobbyStatusChoices';
import type { LobbyTypeChoices } from './LobbyTypeChoices';
export type LobbyCreate = {
    startAt?: (string | null);
    telegramGroup: string;
    status?: (LobbyStatusChoices | null);
    stakeAmount?: (number | string | null);
    totalAmount?: (number | string | null);
    priceAmount?: (number | string | null);
    feeAmount?: (number | string | null);
    currency?: (string | null);
    isPaid?: (boolean | null);
    lobbyType: LobbyTypeChoices;
};

