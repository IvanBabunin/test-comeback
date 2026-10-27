import type { components } from '@/helpers/api/schema';

// Моделі — лише назви для згенерованих DTO. Поля вручну не описуємо.
export type User = components['schemas']['UserDto'];
export type UpdateProfileRequest = components['schemas']['UpdateProfileDto'];
