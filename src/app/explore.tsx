import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const patterns = [
  { label: 'Highest risk', value: '11 PM', detail: 'Night phone use is the danger zone.' },
  { label: 'Main trigger', value: 'Boredom', detail: 'Replace idle time with a 10 min task.' },
  { label: 'Best action', value: 'Walk', detail: 'Most helpful replacement this week.' },
];

const swatches = [
  { name: 'Aarambh Orange', color: '#FF8A1F' },
  { name: 'Calm Teal', color: '#20D6B0' },
  { name: 'Focus Blue', color: '#4C8DFF' },
];

const freeFeatures = ['Streak tracker', 'Urge button', 'Private journal', 'Basic insights'];
const plusFeatures = ['AI coach', 'Weekly summary', 'Custom plan', 'Partner support'];

export default function InsightsScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: safeAreaInsets.top + Spacing.three,
          paddingBottom: safeAreaInsets.bottom + BottomTabInset + Spacing.four,
        },
      ]}>
      <View style={[styles.backgroundGlow, { backgroundColor: theme.accentSoft }]} />

      <ThemedView style={styles.container}>
        <View style={styles.titleRow}>
          <View style={styles.titleCopy}>
            <ThemedText type="small" themeColor="textSecondary">
              Recovery intelligence
            </ThemedText>
            <ThemedText type="subtitle" style={styles.heading}>
              Progress & Coach
            </ThemedText>
          </View>
          <View style={[styles.badge, { backgroundColor: theme.accentSoft }]}>
            <ThemedText type="smallBold" style={{ color: theme.accentStrong }}>
              Free first
            </ThemedText>
          </View>
        </View>

        <View style={styles.patternGrid}>
          {patterns.map((pattern) => (
            <View
              key={pattern.label}
              style={[styles.patternCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <ThemedText type="small" themeColor="textSecondary">
                {pattern.label}
              </ThemedText>
              <ThemedText style={[styles.patternValue, { color: theme.accent }]}>
                {pattern.value}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {pattern.detail}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={[styles.coachCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.coachHeader}>
            <View style={[styles.iconBubble, { backgroundColor: theme.accentSoft }]}>
              <SymbolView
                name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
                tintColor={theme.accent}
                size={24}
              />
            </View>
            <View style={styles.titleCopy}>
              <ThemedText type="smallBold">AI accountability coach</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Paid later, not mandatory for basic recovery.
              </ThemedText>
            </View>
          </View>
          <View style={[styles.chatBubble, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="small">I feel like relapsing.</ThemedText>
          </View>
          <View style={[styles.chatBubble, styles.replyBubble, { backgroundColor: theme.accentSoft }]}>
            <ThemedText type="small">
              Pause. You only need to win the next 10 minutes. Stand up, leave the trigger, and
              start one replacement action.
            </ThemedText>
          </View>
        </View>

        <View style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.sectionHeader}>
            <ThemedText type="smallBold">Brand Color</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              easy to change
            </ThemedText>
          </View>
          <View style={styles.swatchRow}>
            {swatches.map((swatch) => (
              <View key={swatch.name} style={styles.swatchItem}>
                <View style={[styles.swatch, { backgroundColor: swatch.color }]} />
                <ThemedText type="small" style={styles.swatchLabel}>
                  {swatch.name}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.planGrid}>
          <PlanCard title="Free" features={freeFeatures} accent={theme.accent} />
          <PlanCard title="Plus" features={plusFeatures} accent="#7C5CFF" />
        </View>

        <View style={[styles.safetyCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <SymbolView
            name={{ ios: 'heart.text.square', android: 'health_and_safety', web: 'health_and_safety' }}
            tintColor={theme.danger}
            size={24}
          />
          <ThemedText type="small" style={styles.safetyText}>
            Aarambh+ is for habit support and self-control, not medical treatment. If you feel
            depressed, anxious, unsafe, or out of control, reach out to a qualified professional or
            trusted person.
          </ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

function PlanCard({
  title,
  features,
  accent,
}: {
  title: string;
  features: string[];
  accent: string;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.planCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <View style={[styles.planAccent, { backgroundColor: accent }]} />
      <ThemedText type="smallBold">{title}</ThemedText>
      <View style={styles.featureList}>
        {features.map((feature) => (
          <View key={feature} style={styles.featureRow}>
            <View style={[styles.dot, { backgroundColor: accent }]} />
            <ThemedText type="small" style={styles.featureText}>
              {feature}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: Spacing.three,
  },
  backgroundGlow: {
    borderRadius: 120,
    height: 220,
    left: -90,
    opacity: 0.55,
    position: 'absolute',
    top: -70,
    width: 220,
  },
  container: {
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.three,
    justifyContent: 'space-between',
  },
  titleCopy: {
    flex: 1,
    gap: Spacing.one,
  },
  heading: {
    fontSize: 28,
    lineHeight: 36,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  patternGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  patternCard: {
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '31%',
    flexGrow: 1,
    gap: Spacing.one,
    minWidth: 148,
    padding: Spacing.three,
  },
  patternValue: {
    fontSize: 28,
    fontWeight: 900,
    lineHeight: 34,
  },
  coachCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.three,
    padding: Spacing.three,
  },
  coachHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
  },
  iconBubble: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  chatBubble: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    maxWidth: '88%',
    padding: Spacing.three,
  },
  replyBubble: {
    alignSelf: 'flex-end',
  },
  panel: {
    borderRadius: 8,
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
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  swatchItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
    minWidth: 160,
  },
  swatch: {
    borderRadius: 14,
    height: 28,
    width: 28,
  },
  swatchLabel: {
    flex: 1,
  },
  planGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  planCard: {
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '48%',
    flexGrow: 1,
    gap: Spacing.two,
    minWidth: 164,
    overflow: 'hidden',
    padding: Spacing.three,
  },
  planAccent: {
    height: 4,
    marginHorizontal: -Spacing.three,
    marginTop: -Spacing.three,
  },
  featureList: {
    gap: Spacing.two,
  },
  featureRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
  },
  dot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  featureText: {
    flex: 1,
  },
  safetyCard: {
    alignItems: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.three,
  },
  safetyText: {
    flex: 1,
  },
});
