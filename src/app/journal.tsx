import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAppState } from '@/hooks/app-state';
import { useTheme } from '@/hooks/use-theme';

const moods = ['Calm', 'Focused', 'Low', 'Restless'];
const triggers = ['Stress', 'Boredom', 'Loneliness', 'Night', 'Social media', 'Overthinking'];
const energyLevels = ['Low', 'Medium', 'High'];
const sleepLevels = ['Poor', 'Okay', 'Good'];

export default function JournalScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { state, saveJournalEntry, logReset } = useAppState();
  const [mood, setMood] = useState(moods[0]);
  const [trigger, setTrigger] = useState(triggers[0]);
  const [energy, setEnergy] = useState(energyLevels[1]);
  const [sleep, setSleep] = useState(sleepLevels[1]);
  const [reset, setReset] = useState(false);
  const [note, setNote] = useState('');
  const [helped, setHelped] = useState('');

  const save = () => {
    saveJournalEntry({ mood, trigger, energy, sleep, note, helped, reset });
    if (reset) {
      logReset();
    }
    setNote('');
    setHelped('');
    setReset(false);
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
      <View style={styles.container}>
        <ThemedText type="small" themeColor="textSecondary">
          Private check-in
        </ThemedText>
        <ThemedText type="subtitle">Journal</ThemedText>

        <CheckGroup title="Mood" options={moods} selected={mood} onSelect={setMood} />
        <CheckGroup title="Trigger" options={triggers} selected={trigger} onSelect={setTrigger} />
        <View style={styles.twoColumn}>
          <CheckGroup title="Energy" options={energyLevels} selected={energy} onSelect={setEnergy} compact />
          <CheckGroup title="Sleep" options={sleepLevels} selected={sleep} onSelect={setSleep} compact />
        </View>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <ThemedText type="smallBold">Notes</ThemedText>
          <TextInput
            multiline
            value={note}
            onChangeText={setNote}
            placeholder="What happened today?"
            placeholderTextColor={theme.textSecondary}
            style={[styles.input, { color: theme.text, borderColor: theme.cardBorder }]}
          />
          <TextInput
            multiline
            value={helped}
            onChangeText={setHelped}
            placeholder="What helped?"
            placeholderTextColor={theme.textSecondary}
            style={[styles.input, { color: theme.text, borderColor: theme.cardBorder }]}
          />
          <Pressable
            onPress={() => setReset((value) => !value)}
            style={[
              styles.resetRow,
              { backgroundColor: reset ? theme.accentSoft : theme.backgroundElement },
            ]}>
            <View style={[styles.checkbox, { borderColor: theme.accent, backgroundColor: reset ? theme.accent : 'transparent' }]}>
              {reset && <ThemedText style={styles.checkboxMark}>✓</ThemedText>}
            </View>
            <ThemedText type="smallBold">I had a reset today</ThemedText>
          </Pressable>
          <Pressable onPress={save} style={[styles.saveButton, { backgroundColor: theme.accent }]}>
            <ThemedText style={styles.saveText}>Save check-in</ThemedText>
          </Pressable>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <ThemedText type="smallBold">Recent entries</ThemedText>
          {state.journalEntries.length === 0 ? (
            <ThemedText type="small" themeColor="textSecondary">
              No journal entries yet. Start with one honest check-in today.
            </ThemedText>
          ) : (
            state.journalEntries.slice(0, 3).map((entry) => (
              <View key={entry.id} style={styles.entryRow}>
                <ThemedText type="smallBold">{entry.mood}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {entry.trigger} • {new Date(entry.createdAt).toLocaleDateString()}
                </ThemedText>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

function CheckGroup({
  title,
  options,
  selected,
  onSelect,
  compact,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  compact?: boolean;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.card, compact && styles.compactCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <ThemedText type="smallBold">{title}</ThemedText>
      <View style={styles.chipGrid}>
        {options.map((option) => {
          const active = selected === option;
          return (
            <Pressable
              key={option}
              onPress={() => onSelect(option)}
              style={[
                styles.chip,
                {
                  backgroundColor: active ? theme.accentSoft : theme.backgroundElement,
                  borderColor: active ? theme.accent : theme.cardBorder,
                },
              ]}>
              <ThemedText type="smallBold" style={active ? { color: theme.accentStrong } : undefined}>
                {option}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    alignItems: 'center',
    paddingHorizontal: Spacing.two,
  },
  container: {
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.three,
    padding: Spacing.three,
  },
  compactCard: {
    flex: 1,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: Spacing.two,
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
    minHeight: 82,
    padding: Spacing.three,
    textAlignVertical: 'top',
  },
  resetRow: {
    alignItems: 'center',
    borderRadius: 14,
    flexDirection: 'row',
    gap: Spacing.two,
    minHeight: 48,
    paddingHorizontal: Spacing.three,
  },
  checkbox: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  checkboxMark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 900,
  },
  saveButton: {
    alignItems: 'center',
    borderRadius: 14,
    minHeight: 52,
    justifyContent: 'center',
  },
  saveText: {
    color: '#ffffff',
    fontWeight: 800,
  },
  entryRow: {
    gap: Spacing.one,
  },
});
