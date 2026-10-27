import { env } from '@/config/env';
import { tokenStorage } from '@/helpers/storage';

import { ApiError } from './errors';

type Query = Record<string, string | number | boolean | undefined | null>;

type RequestOptions = Omit<RequestInit, 'body' | 'method'> & {
  body?: unknown;
  query?: Query;
};

let onUnauthorized: (() => void) | undefined;

/** Викликається один раз при старті (providers/), щоб 401 розлогінював користувача. */
export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

function buildUrl(path: string, query?: Query) {
  const url = `${env.apiUrl}${path}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) params.append(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const { body, query, headers, ...init } = options;
  const token = await tokenStorage.get();

  const res = await fetch(buildUrl(path, query), {
    ...init,
    method,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await ApiError.fromResponse(res);
    if (error.isUnauthorized) onUnauthorized?.();
    throw error;
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const http = {
  get: <T>(path: string, options?: RequestOptions) => request<T>('GET', path, options),
  post: <T>(path: string, options?: RequestOptions) => request<T>('POST', path, options),
  put: <T>(path: string, options?: RequestOptions) => request<T>('PUT', path, options),
  patch: <T>(path: string, options?: RequestOptions) => request<T>('PATCH', path, options),
  delete: <T>(path: string, options?: RequestOptions) => request<T>('DELETE', path, options),
};
