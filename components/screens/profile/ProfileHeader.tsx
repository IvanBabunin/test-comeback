import { View } from 'react-native';

import { Text } from '@/components/shared/ui';
import { makeStyles } from '@/theme';
import type { User } from '@/types/models/user';

type ProfileHeaderProps = {
  user: User;
};

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <Text variant="subtitle">{user.name}</Text>
      <Text color="textMuted">{user.email}</Text>
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: { gap: t.spacing.xs },
}));
