import { AsyncLocalStorage } from 'async_hooks';
export interface RequestContext {
    ipAddress: string | null;
    userAgent: string | null;
}
export declare const requestContextStorage: AsyncLocalStorage<RequestContext>;
export declare function getRequestContext(): RequestContext;
