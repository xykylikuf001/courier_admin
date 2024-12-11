/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AccountService } from './services/AccountService';
import { ConfigService } from './services/ConfigService';
import { DefaultService } from './services/DefaultService';
import { FaviconService } from './services/FaviconService';
import { FileService } from './services/FileService';
import { LocationService } from './services/LocationService';
import { MessageService } from './services/MessageService';
import { OrderService } from './services/OrderService';
import { ReleaseService } from './services/ReleaseService';
import { SystemService } from './services/SystemService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class FetchClient {
    public readonly account: AccountService;
    public readonly config: ConfigService;
    public readonly default: DefaultService;
    public readonly favicon: FaviconService;
    public readonly file: FileService;
    public readonly location: LocationService;
    public readonly message: MessageService;
    public readonly order: OrderService;
    public readonly release: ReleaseService;
    public readonly system: SystemService;
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
        this.config = new ConfigService(this.request);
        this.default = new DefaultService(this.request);
        this.favicon = new FaviconService(this.request);
        this.file = new FileService(this.request);
        this.location = new LocationService(this.request);
        this.message = new MessageService(this.request);
        this.order = new OrderService(this.request);
        this.release = new ReleaseService(this.request);
        this.system = new SystemService(this.request);
    }
}

