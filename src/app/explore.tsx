import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAppState } from '@/hooks/app-state';
import { useTheme } from '@/hooks/use-theme';

function topTrigger(entries: { trigger: string }[]) {
  if (entries.length === 0) {
    return 'No data yet';
  }

  const counts = entries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.trigger] = (acc[entry.trigger] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'No data yet';
}

export default function ProgressScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { state, currentStreak } = useAppState();
  const rescueCount = state.rescueSessions.length;
  const reducedCount = state.rescueSessions.filter((session) => session.reduced).length;
  const successRate = rescueCount === 0 ? 0 : Math.round((reducedCount / rescueCount) * 100);
  const resetCount = state.journalEntries.filter((entry) => entry.reset).length;

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
      <View style={[styles.glow, { backgroundColor: theme.accentSoft }]} />
      <View style={styles.container}>
        <ThemedText type="small" themeColor="textSecondary">
          Recovery intelligence
        </ThemedText>
        <ThemedText type="subtitle">Progress</ThemedText>

        <View style={styles.metricGrid}>
          <Metric label="Current streak" value={`${currentStreak}`} detail="days" />
          <Metric label="Best streak" value={`${Math.max(state.bestStreak, currentStreak)}`} detail="days" />
          <Metric label="Rescue sessions" value={`${rescueCount}`} detail="completed" />
          <Metric label="Success rate" value={`${successRate}%`} detail="urge reduced" />
        </View>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.cardHeader}>
            <ThemedText type="smallBold">Trigger pattern</ThemedText>
            <SymbolView
              name={{ ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' }}
              tintColor={theme.accent}
              size={24}
            />
          </View>
          <ThemedText style={[styles.bigValue, { color: theme.accent }]}>{topTrigger(state.journalEntries)}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Most common trigger from saved journal check-ins.
          </ThemedText>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <ThemedText type="smallBold">Weekly snapshot</ThemedText>
          <View style={styles.snapshotRow}>
            <Snapshot label="Journal entries" value={state.journalEntries.length} />
            <Snapshot label="Resets logged" value={resetCount} />
            <Snapshot label="Risk time" value="11 PM" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  const theme = useTheme();

  return (
    <View style={[styles.metricCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText style={[styles.metricValue, { color: theme.accent }]}>{value}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {detail}
      </ThemedText>
    </View>
  );
}

function Snapshot({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.snapshotItem}>
      <ThemedText type="smallBold">{value}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: Spacing.two,
  },
  glow: {
    borderRadius: 180,
    height: 300,
    left: -140,
    opacity: 0.7,
    position: 'absolute',
    top: -100,
    width: 300,
  },
  container: {
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  metricCard: {
    borderRadius: 20,
    borderWidth: 1,
    flexBasis: '48%',
    flexGrow: 1,
    gap: Spacing.one,
    minWidth: 150,
    padding: Spacing.three,
  },
  metricValue: {
    fontSize: 34,
    fontWeight: 900,
    lineHeight: 40,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.three,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigValue: {
    fontSize: 30,
    fontWeight: 900,
    lineHeight: 36,
  },
  snapshotRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  snapshotItem: {
    flex: 1,
    gap: Spacing.one,
  },
});
