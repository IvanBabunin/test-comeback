/** Єдиний тип помилки API. Форма відповіді — стандартна для NestJS. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  get isClientError() {
    return this.status >= 400 && this.status < 500;
  }

  static async fromResponse(res: Response): Promise<ApiError> {
    let body: { message?: string | string[]; error?: string } | undefined;
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }
    const raw = body?.message ?? body?.error ?? res.statusText;
    const message = Array.isArray(raw) ? raw.join(', ') : (raw ?? 'Request failed');
    return new ApiError(res.status, message, body);
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;
