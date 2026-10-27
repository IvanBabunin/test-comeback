/**
 * ЗГЕНЕРОВАНО: `npm run api:types` (openapi-typescript зі Swagger NestJS).
 * Не редагуй вручну — перезапиши командою.
 *
 * Нижче — приклад, щоб шаблон компілювався до першої генерації.
 */
export interface paths {}

export interface components {
  schemas: {
    UserDto: {
      id: string;
      email: string;
      name: string;
    };
    LoginDto: {
      email: string;
      password: string;
    };
    AuthResponseDto: {
      accessToken: string;
      user: components['schemas']['UserDto'];
    };
    UpdateProfileDto: {
      name?: string;
    };
  };
}
