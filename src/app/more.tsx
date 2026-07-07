import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing, type AppThemeId } from '@/constants/theme';
import { useAppTheme } from '@/hooks/theme-context';
import { useTheme } from '@/hooks/use-theme';

const items = ['Privacy', 'Goals', 'Accountability partner', 'Settings'];
const themeOptions = [
  {
    id: 'aarambhDark',
    name: 'Aarambh Dark',
    description: 'Current default',
    colors: ['#061B1A', '#103B38', '#14B8A6'],
  },
  {
    id: 'calmLight',
    name: 'Calm Light',
    description: 'Clean daytime mode',
    colors: ['#F8FAFC', '#FFFFFF', '#0F766E'],
  },
  {
    id: 'focusBlue',
    name: 'Focus Blue',
    description: 'Cool focus palette',
    colors: ['#071827', '#102A43', '#38BDF8'],
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    description: 'Warm motivation',
    colors: ['#1F1308', '#3A2412', '#F59E0B'],
  },
] satisfies Array<{
  id: AppThemeId;
  name: string;
  description: string;
  colors: string[];
}>;

export default function MoreScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { themeId, setThemeId } = useAppTheme();

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

        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitle}>
              <ThemedText type="smallBold">Theme</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Choose the look that feels right.
              </ThemedText>
            </View>
            <ThemedText type="smallBold" style={{ color: theme.accent }}>
              Default
            </ThemedText>
          </View>

          <View style={styles.themeGrid}>
            {themeOptions.map((option) => {
              const selected = themeId === option.id;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => setThemeId(option.id)}
                  style={({ pressed }) => [
                    styles.themeCard,
                    {
                      backgroundColor: selected ? theme.accentSoft : theme.backgroundElement,
                      borderColor: selected ? theme.accent : theme.cardBorder,
                    },
                    pressed && styles.pressed,
                  ]}>
                  <View style={styles.swatchRow}>
                    {option.colors.map((color) => (
                      <View key={color} style={[styles.swatch, { backgroundColor: color }]} />
                    ))}
                  </View>
                  <ThemedText type="smallBold">{option.name}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {selected ? 'Selected' : option.description}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

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
  section: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.three,
    padding: Spacing.three,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    flex: 1,
    gap: Spacing.one,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  themeCard: {
    borderRadius: 16,
    borderWidth: 1,
    flexBasis: '48%',
    flexGrow: 1,
    gap: Spacing.two,
    minHeight: 126,
    minWidth: 150,
    padding: Spacing.three,
  },
  swatchRow: {
    flexDirection: 'row',
  },
  swatch: {
    borderRadius: 12,
    height: 24,
    marginRight: -6,
    width: 24,
  },
  row: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.one,
    padding: Spacing.three,
  },
  pressed: {
    opacity: 0.76,
  },
});
