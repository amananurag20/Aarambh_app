import { SymbolView } from 'expo-symbols';
import { type ComponentProps, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SymbolName = ComponentProps<typeof SymbolView>['name'];

const activities = [
  {
    title: 'Quick Calm',
    detail: 'One minute reset',
    duration: 60,
    icon: { ios: 'wind', android: 'air', web: 'air' },
    steps: ['Relax your jaw.', 'Drop your shoulders.', 'Slow the next breath.'],
  },
  {
    title: 'Breathing',
    detail: '3-minute rhythm',
    duration: 180,
    icon: { ios: 'circle.dotted', android: 'radio_button_unchecked', web: 'radio_button_unchecked' },
    steps: ['Breathe in for 4.', 'Hold for 2.', 'Breathe out for 6.'],
  },
  {
    title: 'Grounding',
    detail: '5-4-3-2-1 method',
    duration: 120,
    icon: { ios: 'hand.raised.fill', android: 'front_hand', web: 'front_hand' },
    steps: ['Notice 5 things you see.', 'Feel 4 body sensations.', 'Name 3 sounds around you.'],
  },
  {
    title: 'Body Scan',
    detail: 'Release tension',
    duration: 180,
    icon: { ios: 'figure.mind.and.body', android: 'self_improvement', web: 'self_improvement' },
    steps: ['Relax the face.', 'Soften the chest.', 'Unclench hands and legs.'],
  },
  {
    title: 'Sleep Calm',
    detail: 'Night reset',
    duration: 240,
    icon: { ios: 'moon.fill', android: 'dark_mode', web: 'dark_mode' },
    steps: ['Dim the screen.', 'Put the phone away after this.', 'Choose rest over scrolling.'],
  },
  {
    title: 'Focus Reset',
    detail: 'Study or work prep',
    duration: 120,
    icon: { ios: 'target', android: 'track_changes', web: 'track_changes' },
    steps: ['Choose one task.', 'Clear one distraction.', 'Start with two quiet minutes.'],
  },
] satisfies Array<{
  title: string;
  detail: string;
  duration: number;
  icon: SymbolName;
  steps: string[];
}>;

const groundingPrompts = [
  '5 things I can see',
  '4 things I can feel',
  '3 things I can hear',
  '2 things I can smell',
  '1 helpful choice I can make now',
];

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

export default function MindfulnessScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const [selected, setSelected] = useState(activities[0]);
  const [secondsLeft, setSecondsLeft] = useState(activities[0].duration);
  const [running, setRunning] = useState(false);
  const [thought, setThought] = useState('');

  useEffect(() => {
    setSecondsLeft(selected.duration);
    setRunning(false);
  }, [selected]);

  useEffect(() => {
    if (!running || secondsLeft <= 0) {
      if (secondsLeft <= 0) {
        setRunning(false);
      }
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [running, secondsLeft]);

  const progress = 1 - secondsLeft / selected.duration;
  const phaseIndex = Math.floor(progress * selected.steps.length);
  const currentStep = selected.steps[Math.min(phaseIndex, selected.steps.length - 1)];
  const togglePractice = () => {
    if (secondsLeft <= 0) {
      setSecondsLeft(selected.duration);
      setRunning(true);
      return;
    }

    setRunning((value) => !value);
  };

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
        <View style={styles.header}>
          <ThemedText type="small" themeColor="textSecondary">
            Aarambh+ Mindfulness
          </ThemedText>
          <ThemedText type="subtitle">Calm activities</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Choose a short practice when you want prevention, focus, or a softer reset.
          </ThemedText>
        </View>

        <View style={[styles.practiceCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.practiceTop}>
            <View style={styles.practiceCopy}>
              <ThemedText type="smallBold">{selected.title}</ThemedText>
              <ThemedText style={[styles.timer, { color: theme.accentStrong }]}>
                {formatTime(secondsLeft)}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {currentStep}
              </ThemedText>
            </View>
            <View style={[styles.orb, { borderColor: theme.accent, backgroundColor: theme.accentSoft }]}>
              <SymbolView name={selected.icon} tintColor={theme.accent} size={34} />
            </View>
          </View>

          <View style={[styles.progressTrack, { backgroundColor: theme.backgroundElement }]}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: theme.accent, width: `${Math.max(progress * 100, 4)}%` },
              ]}
            />
          </View>

          <Pressable
            onPress={togglePractice}
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: theme.accent },
              pressed && styles.pressed,
            ]}>
            <ThemedText style={styles.primaryButtonText}>
              {running
                ? 'Pause practice'
                : secondsLeft <= 0
                  ? 'Restart practice'
                  : secondsLeft < selected.duration
                    ? 'Resume practice'
                    : 'Begin practice'}
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.activityGrid}>
          {activities.map((activity) => {
            const active = selected.title === activity.title;
            return (
              <Pressable
                key={activity.title}
                onPress={() => setSelected(activity)}
                style={({ pressed }) => [
                  styles.activityCard,
                  {
                    backgroundColor: active ? theme.accentSoft : theme.card,
                    borderColor: active ? theme.accent : theme.cardBorder,
                  },
                  pressed && styles.pressed,
                ]}>
                <View style={[styles.smallIcon, { backgroundColor: theme.accentSoft }]}>
                  <SymbolView name={activity.icon} tintColor={theme.accent} size={22} />
                </View>
                <View style={styles.activityCopy}>
                  <ThemedText type="smallBold">{activity.title}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {activity.detail}
                  </ThemedText>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <ThemedText type="smallBold">Grounding prompts</ThemedText>
          {groundingPrompts.map((prompt, index) => (
            <View key={prompt} style={styles.promptRow}>
              <View style={[styles.promptNumber, { backgroundColor: theme.accentSoft }]}>
                <ThemedText type="smallBold" style={{ color: theme.accentStrong }}>
                  {index + 1}
                </ThemedText>
              </View>
              <ThemedText type="small">{prompt}</ThemedText>
            </View>
          ))}
        </View>

        <View style={[styles.panel, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={styles.sectionHeader}>
            <ThemedText type="smallBold">Thought dump</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              private
            </ThemedText>
          </View>
          <TextInput
            value={thought}
            onChangeText={setThought}
            multiline
            placeholder="Write what is in your mind. No judgment, just release it."
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
          <Pressable
            onPress={() => setThought('')}
            style={({ pressed }) => [
              styles.clearButton,
              { borderColor: theme.cardBorder, backgroundColor: theme.backgroundElement },
              pressed && styles.pressed,
            ]}>
            <ThemedText type="smallBold">Clear after release</ThemedText>
          </Pressable>
        </View>
      </View>
    </ScrollView>
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
    opacity: 0.72,
    position: 'absolute',
    right: -140,
    top: -110,
    width: 300,
  },
  container: {
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  header: {
    gap: Spacing.one,
  },
  practiceCard: {
    borderRadius: 24,
    borderWidth: 1,
    gap: Spacing.three,
    padding: Spacing.three,
  },
  practiceTop: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.three,
    justifyContent: 'space-between',
  },
  practiceCopy: {
    flex: 1,
    gap: Spacing.one,
    minWidth: 0,
  },
  timer: {
    fontSize: 48,
    fontWeight: 900,
    lineHeight: 56,
  },
  orb: {
    alignItems: 'center',
    borderRadius: 58,
    borderWidth: 8,
    flexShrink: 0,
    height: 116,
    justifyContent: 'center',
    width: 116,
  },
  progressTrack: {
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 999,
    height: '100%',
  },
  primaryButton: {
    alignItems: 'center',
    borderRadius: 999,
    minHeight: 54,
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 800,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  activityCard: {
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    flexBasis: '48%',
    flexDirection: 'row',
    flexGrow: 1,
    gap: Spacing.two,
    minHeight: 92,
    minWidth: 150,
    padding: Spacing.three,
  },
  smallIcon: {
    alignItems: 'center',
    borderRadius: 22,
    flexShrink: 0,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  activityCopy: {
    flex: 1,
    gap: Spacing.one,
    minWidth: 0,
  },
  panel: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.three,
    padding: Spacing.three,
  },
  promptRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
  },
  promptNumber: {
    alignItems: 'center',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderRadius: 16,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 112,
    padding: Spacing.three,
    textAlignVertical: 'top',
  },
  clearButton: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    minHeight: 48,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.76,
  },
});
