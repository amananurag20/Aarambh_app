import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const items = ['Privacy', 'Goals', 'Accountability partner', 'Settings'];

export default function MoreScreen() {
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
          Aarambh+
        </ThemedText>
        <ThemedText type="subtitle">More</ThemedText>
        {items.map((item) => (
          <View
            key={item}
            style={[styles.row, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <ThemedText type="smallBold">{item}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Coming soon
            </ThemedText>
          </View>
        ))}
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
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  row: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.one,
    padding: Spacing.three,
  },
});
