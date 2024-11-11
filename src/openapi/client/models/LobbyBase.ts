/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LobbyStatusChoices } from './LobbyStatusChoices';
import type { LobbyTypeChoices } from './LobbyTypeChoices';
export type LobbyBase = {
    startAt?: (string | null);
    telegramGroup?: (string | null);
    status?: (LobbyStatusChoices | null);
    stakeAmount?: (number | string | null);
    totalAmount?: (number | string | null);
    priceAmount?: (number | string | null);
    feeAmount?: (number | string | null);
    currency?: (string | null);
    isPaid?: (boolean | null);
    lobbyType?: (LobbyTypeChoices | null);
};

