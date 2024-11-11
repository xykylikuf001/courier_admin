/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AccountService } from './services/AccountService';
import { DefaultService } from './services/DefaultService';
import { FaviconService } from './services/FaviconService';
import { LobbyService } from './services/LobbyService';
import { PaymentService } from './services/PaymentService';
import { WalletService } from './services/WalletService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class FetchClient {
    public readonly account: AccountService;
    public readonly default: DefaultService;
    public readonly favicon: FaviconService;
    public readonly lobby: LobbyService;
    public readonly payment: PaymentService;
    public readonly wallet: WalletService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '0.1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
            NEXT: config?.NEXT,
            CALLBACKS: config?.CALLBACKS??null,
        });
        this.account = new AccountService(this.request);
        this.default = new DefaultService(this.request);
        this.favicon = new FaviconService(this.request);
        this.lobby = new LobbyService(this.request);
        this.payment = new PaymentService(this.request);
        this.wallet = new WalletService(this.request);
    }
}

