import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const prompts = ['I need a reset', 'Give me motivation', 'Help me sleep'];

export default function CoachScreen() {
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
          Aarambh+ Coach
        </ThemedText>
        <ThemedText type="subtitle">Calm guidance</ThemedText>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <ThemedText type="smallBold">AI coach preview</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Short, private, action-focused support for difficult moments.
          </ThemedText>
        </View>
        <View style={styles.promptGrid}>
          {prompts.map((prompt) => (
            <View
              key={prompt}
              style={[styles.prompt, { backgroundColor: theme.accentSoft, borderColor: theme.cardBorder }]}>
              <ThemedText type="smallBold" style={{ color: theme.accentStrong }}>
                {prompt}
              </ThemedText>
            </View>
          ))}
        </View>
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
  card: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.three,
  },
  promptGrid: {
    gap: Spacing.two,
  },
  prompt: {
    borderRadius: 14,
    borderWidth: 1,
    padding: Spacing.three,
  },
});
