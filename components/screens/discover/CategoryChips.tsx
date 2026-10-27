import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { Chip } from '@/components/shared/ui';
import { makeStyles } from '@/theme';

type CategoryChipsProps = {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
};

export function CategoryChips({ categories, selected, onSelect }: CategoryChipsProps) {
  const { t } = useTranslation('discover');
  const styles = useStyles();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      <Chip label={t('categories.all')} selected={selected === null} onPress={() => onSelect(null)} />
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          selected={selected === category}
          onPress={() => onSelect(category)}
        />
      ))}
    </ScrollView>
  );
}

const useStyles = makeStyles((t) => ({
  // Стрічка виходить за відступи екрана, щоб чипи прокручувались від краю до краю.
  scroll: { marginHorizontal: -t.spacing.lg, overflow: 'visible' },
  content: { gap: t.spacing.xs, paddingHorizontal: t.spacing.lg, paddingVertical: t.spacing.xxs },
}));
