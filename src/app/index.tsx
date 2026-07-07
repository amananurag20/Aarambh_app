import { SymbolView } from 'expo-symbols';
import { type ComponentProps, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const week = [
  { day: 'M', done: true },
  { day: 'T', done: true },
  { day: 'W', done: true },
  { day: 'T', done: true },
  { day: 'F', done: true },
  { day: 'S', done: false },
  { day: 'S', done: false },
];

const triggers = ['Night phone', 'Stress', 'Boredom', 'Loneliness'];
type SymbolName = ComponentProps<typeof SymbolView>['name'];

export default function HomeScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const [selectedTrigger, setSelectedTrigger] = useState(triggers[0]);
  const [note, setNote] = useState('');
  const [urgeMode, setUrgeMode] = useState(false);

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
        <View style={styles.header}>
          <View style={[styles.brandMark, { backgroundColor: theme.accent }]}>
            <SymbolView
              name={{ ios: 'shield.fill', android: 'shield', web: 'shield' }}
              tintColor="#ffffff"
              size={24}
            />
          </View>
          <View style={styles.headerText}>
            <ThemedText type="small" themeColor="textSecondary">
              Aarambh+
            </ThemedText>
            <ThemedText type="subtitle" style={styles.heading}>
              Good evening, Anurag
            </ThemedText>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.signInButton,
              { borderColor: theme.cardBorder, backgroundColor: theme.card },
              pressed && styles.pressed,
            ]}>
            <ThemedText type="smallBold">Sign in</ThemedText>
          </Pressable>
        </View>

        <ThemedText themeColor="textSecondary" style={styles.tagline}>
          One day stronger. Every reset is private, calm, and judgment-free.
        </ThemedText>

        <View style={[styles.streakCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.streakCopy}>
            <ThemedText type="smallBold">Current Streak</ThemedText>
            <View style={styles.streakRow}>
              <ThemedText style={[styles.streakNumber, { color: theme.accent }]}>17</ThemedText>
              <ThemedText type="subtitle" style={styles.daysText}>
                Days
              </ThemedText>
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              Strong progress. Your next step is already clear.
            </ThemedText>
          </View>
          <View style={[styles.progressRing, { borderColor: theme.accent }]}>
            <View style={[styles.progressCore, { backgroundColor: theme.accentSoft }]}>
              <SymbolView
                name={{ ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' }}
                tintColor={theme.accent}
                size={34}
              />
            </View>
          </View>
          <View style={styles.weekRow}>
            {week.map((item, index) => (
              <View key={`${item.day}-${index}`} style={styles.weekItem}>
                <ThemedText type="small" themeColor="textSecondary">
                  {item.day}
                </ThemedText>
                <View
                  style={[
                    styles.weekDot,
                    {
                      backgroundColor: item.done ? theme.accent : 'transparent',
                      borderColor: item.done ? theme.accent : theme.backgroundSelected,
                    },
                  ]}>
                  {item.done && <ThemedText style={styles.check}>✓</ThemedText>}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actionGrid}>
          <ActionTile
            title="Rescue"
            detail="5-minute reset"
            icon={{ ios: 'bolt.fill', android: 'bolt', web: 'bolt' }}
            onPress={() => setUrgeMode((current) => !current)}
            active={urgeMode}
          />
          <ActionTile
            title="AI Coach"
            detail="Calm guidance"
            icon={{ ios: 'message.fill', android: 'chat', web: 'chat' }}
          />
          <ActionTile
            title="Journal"
            detail="Write your thoughts"
            icon={{ ios: 'doc.text.fill', android: 'edit_note', web: 'edit_note' }}
          />
          <ActionTile
            title="Progress"
            detail="See improvement"
            icon={{ ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' }}
          />
        </View>

        {urgeMode && (
          <View style={[styles.urgePanel, { backgroundColor: theme.accentSoft, borderColor: theme.accent }]}>
            <ThemedText type="smallBold">5-minute rescue started</ThemedText>
            <ThemedText type="small">
              Breathe for 60 seconds, drink water, and move away from the trigger. Just win this
              small moment.
            </ThemedText>
          </View>
        )}

        <View style={[styles.missionCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.missionHeader}>
            <ThemedText type="smallBold">Today&apos;s Mission</ThemedText>
            <SymbolView
              name={{ ios: 'flag.fill', android: 'flag', web: 'flag' }}
              tintColor={theme.accent}
              size={24}
            />
          </View>
          <ThemedText style={[styles.quote, { color: theme.accentStrong }]}>
            One calm reset keeps the streak alive.
          </ThemedText>
        </View>

        <View style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.sectionHeader}>
            <ThemedText type="smallBold">Daily Check-in</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              free tracker
            </ThemedText>
          </View>
          <View style={styles.chipGrid}>
            {triggers.map((trigger) => {
              const selected = selectedTrigger === trigger;
              return (
                <Pressable
                  key={trigger}
                  onPress={() => setSelectedTrigger(trigger)}
                  style={[
                    styles.chip,
                    {
                      borderColor: selected ? theme.accent : theme.cardBorder,
                      backgroundColor: selected ? theme.accentSoft : theme.backgroundElement,
                    },
                  ]}>
                  <ThemedText
                    type="smallBold"
                    style={selected ? { color: theme.accentStrong } : undefined}>
                    {trigger}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.sectionHeader}>
            <ThemedText type="smallBold">Private Journal</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              on device
            </ThemedText>
          </View>
          <TextInput
            value={note}
            onChangeText={setNote}
            multiline
            placeholder="Mood, energy, sleep, trigger, and what helped today."
            placeholderTextColor={theme.textSecondary}
            style={[
              styles.input,
              {
                color: theme.text,
                borderColor: theme.cardBorder,
                backgroundColor: theme.background,
              },
            ]}
          />
        </View>
      </ThemedView>
    </ScrollView>
  );
}

function ActionTile({
  title,
  detail,
  icon,
  active,
  onPress,
}: {
  title: string;
  detail: string;
  icon: SymbolName;
  active?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionTile,
        {
          backgroundColor: active ? theme.accentSoft : theme.card,
          borderColor: active ? theme.accent : theme.cardBorder,
        },
        pressed && styles.pressed,
      ]}>
      <View style={styles.actionCopy}>
        <ThemedText type="smallBold">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {detail}
        </ThemedText>
      </View>
      <View style={[styles.iconBubble, { backgroundColor: theme.accentSoft }]}>
        <SymbolView name={icon} tintColor={theme.accent} size={24} />
      </View>
    </Pressable>
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
    opacity: 0.55,
    position: 'absolute',
    right: -90,
    top: -70,
    width: 220,
  },
  container: {
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.three,
  },
  brandMark: {
    alignItems: 'center',
    borderRadius: 18,
    height: 54,
    justifyContent: 'center',
    shadowColor: '#14B8A6',
    shadowOpacity: 0.32,
    shadowRadius: 18,
    width: 54,
  },
  headerText: {
    flex: 1,
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
  },
  signInButton: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  tagline: {
    maxWidth: 520,
  },
  streakCard: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.three,
    padding: Spacing.three,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
  },
  streakCopy: {
    gap: Spacing.one,
  },
  streakRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: Spacing.two,
  },
  streakNumber: {
    fontSize: 46,
    fontWeight: 900,
    lineHeight: 52,
  },
  daysText: {
    lineHeight: 40,
  },
  progressRing: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 54,
    borderWidth: 8,
    height: 108,
    justifyContent: 'center',
    marginTop: -98,
    width: 108,
  },
  progressCore: {
    alignItems: 'center',
    borderRadius: 38,
    height: 76,
    justifyContent: 'center',
    width: 76,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekItem: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  weekDot: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  check: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 900,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  actionTile: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    flexBasis: '48%',
    flexDirection: 'row',
    flexGrow: 1,
    gap: Spacing.two,
    justifyContent: 'space-between',
    minHeight: 112,
    minWidth: 156,
    padding: Spacing.three,
  },
  actionCopy: {
    flex: 1,
    gap: Spacing.one,
  },
  iconBubble: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  urgePanel: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.one,
    padding: Spacing.three,
  },
  missionCard: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.three,
    padding: Spacing.three,
  },
  missionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quote: {
    fontSize: 23,
    fontWeight: 800,
    lineHeight: 32,
  },
  panel: {
    borderRadius: 14,
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
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 104,
    padding: Spacing.three,
    textAlignVertical: 'top',
  },
  pressed: {
    opacity: 0.76,
  },
});
