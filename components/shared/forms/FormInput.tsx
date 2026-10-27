import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TextInputProps } from 'react-native';

import { Input } from '@/components/shared/ui';

type FormInputProps<T extends FieldValues> = Omit<TextInputProps, 'value' | 'onChangeText'> & {
  control: Control<T>;
  name: Path<T>;
  label?: string;
};

/** Поле, підключене до react-hook-form. Повідомлення помилки — ключ перекладу зі zod-схеми. */
export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: FormInputProps<T>) {
  const { t } = useTranslation();
  const { field, fieldState } = useController({ control, name });
  const errorKey = fieldState.error?.message;

  return (
    <Input
      label={label}
      value={field.value ?? ''}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      error={errorKey ? t(errorKey as never) : undefined}
      {...props}
    />
  );
}
