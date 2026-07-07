import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const chips = ['Calm', 'Stress', 'Boredom', 'Night', 'Social media', 'Overthinking'];

export default function JournalScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: safeAreaInsets.top + Spacing.four,
          paddingBottom: safeAreaInsets.bottom + BottomTabInset + Spacing.six,
        },
      ]}>
      <View style={styles.container}>
        <ThemedText type="small" themeColor="textSecondary">
          Private check-in
        </ThemedText>
        <ThemedText type="subtitle">Journal</ThemedText>
        <View style={styles.chipGrid}>
          {chips.map((chip) => (
            <View
              key={chip}
              style={[styles.chip, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <ThemedText type="smallBold">{chip}</ThemedText>
            </View>
          ))}
        </View>
        <TextInput
          multiline
          placeholder="What happened today? What helped?"
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.input,
            {
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
              color: theme.text,
            },
          ]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
  },
  container: {
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 180,
    padding: Spacing.three,
    textAlignVertical: 'top',
  },
});
