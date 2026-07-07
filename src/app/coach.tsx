import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const prompts = [
  {
    text: 'I need a reset',
    reply:
      'Pause for 60 seconds. Put the phone down, breathe slowly, and move to a different place. You only need to win this small moment.',
  },
  {
    text: 'Give me motivation',
    reply:
      'You are building proof that you can trust yourself. One calm choice now becomes confidence later.',
  },
  {
    text: 'Help me sleep',
    reply:
      'Dim the screen, drink water, and choose a low-stimulation routine. Your goal is rest, not perfection.',
  },
  {
    text: 'I reset today',
    reply:
      'Log it honestly, learn the trigger, and begin again. A reset is data, not your identity.',
  },
];

export default function CoachScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);

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
          Aarambh+ Coach
        </ThemedText>
        <ThemedText type="subtitle">Calm guidance</ThemedText>

        <View style={[styles.chatCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={[styles.userBubble, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="small">{selectedPrompt.text}</ThemedText>
          </View>
          <View style={[styles.coachBubble, { backgroundColor: theme.accentSoft }]}>
            <ThemedText type="small">{selectedPrompt.reply}</ThemedText>
          </View>
        </View>

        <View style={styles.promptGrid}>
          {prompts.map((prompt) => {
            const selected = selectedPrompt.text === prompt.text;
            return (
              <Pressable
                key={prompt.text}
                onPress={() => setSelectedPrompt(prompt)}
                style={({ pressed }) => [
                  styles.prompt,
                  {
                    backgroundColor: selected ? theme.accentSoft : theme.card,
                    borderColor: selected ? theme.accent : theme.cardBorder,
                  },
                  pressed && styles.pressed,
                ]}>
                <ThemedText type="smallBold" style={selected ? { color: theme.accentStrong } : undefined}>
                  {prompt.text}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
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
  chatCard: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.three,
    padding: Spacing.three,
  },
  userBubble: {
    alignSelf: 'flex-start',
    borderRadius: 18,
    maxWidth: '88%',
    padding: Spacing.three,
  },
  coachBubble: {
    alignSelf: 'flex-end',
    borderRadius: 18,
    maxWidth: '90%',
    padding: Spacing.three,
  },
  promptGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  prompt: {
    borderRadius: 14,
    borderWidth: 1,
    flexBasis: '48%',
    flexGrow: 1,
    minHeight: 58,
    minWidth: 150,
    justifyContent: 'center',
    padding: Spacing.three,
  },
  pressed: {
    opacity: 0.76,
  },
});
