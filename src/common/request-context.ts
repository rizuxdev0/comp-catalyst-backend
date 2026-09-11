import { AsyncLocalStorage } from 'async_hooks';

/**
 * Request-scoped storage using Node.js native AsyncLocalStorage.
 * Stores contextual information (like IP address, user agent) for the
 * current HTTP request, accessible from any service without explicit propagation.
 *
 * This avoids modifying every controller/service to pass request metadata.
 */
export interface RequestContext {
  /** Client IP address (supports proxy headers like X-Forwarded-For) */
  ipAddress: string | null;
  /** User agent string from the request */
  userAgent: string | null;
}

export const requestContextStorage = new AsyncLocalStorage<RequestContext>();

/**
 * Retrieves the current request context from AsyncLocalStorage.
 * Returns null values if called outside of an HTTP request context.
 */
export function getRequestContext(): RequestContext {
  return requestContextStorage.getStore() || { ipAddress: null, userAgent: null };
}
