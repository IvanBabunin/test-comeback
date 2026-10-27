import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { FormInput } from '@/components/shared/forms';
import { Button, Text } from '@/components/shared/ui';
import { isApiError } from '@/helpers/api/errors';
import { useLogin } from '@/hooks/api/auth/useLogin';
import { makeStyles } from '@/theme';
import { loginSchema, type LoginForm as LoginFormValues } from '@/types/forms/login';

export function LoginForm() {
  const { t } = useTranslation(['auth', 'common']);
  const styles = useStyles();
  const login = useLogin();
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit((values) => login.mutate(values));

  const errorText =
    login.error && isApiError(login.error) && login.error.isUnauthorized
      ? t('errors.invalidCredentials')
      : login.error
        ? t('common:errors.generic')
        : null;

  return (
    <View style={styles.root}>
      <FormInput
        control={control}
        name="email"
        label={t('login.email')}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <FormInput
        control={control}
        name="password"
        label={t('login.password')}
        secureTextEntry
        autoComplete="password"
        textContentType="password"
      />
      {errorText ? <Text color="danger">{errorText}</Text> : null}
      <Button title={t('login.submit')} onPress={onSubmit} loading={login.isPending} />
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: { gap: t.spacing.lg },
}));
