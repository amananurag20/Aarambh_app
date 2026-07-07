import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAppState } from '@/hooks/app-state';
import { useTheme } from '@/hooks/use-theme';

const totalSeconds = 300;
const steps = ['Breathe slowly', 'Drink water', 'Walk away', 'Write the trigger'];

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

export default function RescueScreen() {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { completeRescueSession } = useAppState();
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running || secondsLeft <= 0) {
      if (secondsLeft <= 0) {
        setRunning(false);
        setFinished(true);
      }
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [running, secondsLeft]);

  const complete = (reduced: boolean) => {
    completeRescueSession({ trigger: 'Manual rescue', reduced });
    setFinished(true);
    setRunning(false);
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
        <ThemedText type="small" themeColor="textSecondary">
          Aarambh+ Rescue
        </ThemedText>
        <ThemedText type="subtitle">Start 5-Minute Rescue</ThemedText>

        <View style={[styles.timerCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <View style={[styles.breathingCircle, { borderColor: theme.accent, backgroundColor: theme.accentSoft }]}>
            <ThemedText style={[styles.timer, { color: theme.accentStrong }]}>
              {formatTime(secondsLeft)}
            </ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
            You do not need to solve the whole day. Just win the next few minutes.
          </ThemedText>
          <Pressable
            onPress={() => setRunning((value) => !value)}
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: theme.accent },
              pressed && styles.pressed,
            ]}>
            <ThemedText style={styles.primaryButtonText}>
              {running ? 'Pause rescue' : secondsLeft < totalSeconds ? 'Resume rescue' : 'Begin now'}
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.stepGrid}>
          {steps.map((step, index) => (
            <View key={step} style={[styles.stepCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <View style={[styles.stepBadge, { backgroundColor: theme.accentSoft }]}>
                <ThemedText style={{ color: theme.accentStrong }}>{index + 1}</ThemedText>
              </View>
              <ThemedText type="smallBold">{step}</ThemedText>
            </View>
          ))}
        </View>

        {(finished || secondsLeft < totalSeconds) && (
          <View style={[styles.checkCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
            <SymbolView
              name={{ ios: 'checkmark.shield.fill', android: 'shield', web: 'shield' }}
              tintColor={theme.accent}
              size={28}
            />
            <ThemedText type="smallBold">Did the urge reduce?</ThemedText>
            <View style={styles.buttonRow}>
              <Pressable
                onPress={() => complete(true)}
                style={[styles.secondaryButton, { borderColor: theme.accent }]}>
                <ThemedText type="smallBold" style={{ color: theme.accentStrong }}>
                  Yes
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() => complete(false)}
                style={[styles.secondaryButton, { borderColor: theme.cardBorder }]}>
                <ThemedText type="smallBold">Need more time</ThemedText>
              </Pressable>
            </View>
          </View>
        )}
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
    opacity: 0.75,
    position: 'absolute',
    right: -130,
    top: -90,
    width: 300,
  },
  container: {
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  timerCard: {
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    gap: Spacing.three,
    padding: Spacing.four,
  },
  breathingCircle: {
    alignItems: 'center',
    borderRadius: 92,
    borderWidth: 8,
    height: 184,
    justifyContent: 'center',
    width: 184,
  },
  timer: {
    fontSize: 46,
    fontWeight: 900,
  },
  centerText: {
    textAlign: 'center',
  },
  primaryButton: {
    alignItems: 'center',
    borderRadius: 999,
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    width: '100%',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 800,
  },
  stepGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  stepCard: {
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    flexBasis: '48%',
    flexGrow: 1,
    gap: Spacing.two,
    minHeight: 104,
    minWidth: 140,
    padding: Spacing.three,
  },
  stepBadge: {
    alignItems: 'center',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  checkCard: {
    borderRadius: 20,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.three,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  secondaryButton: {
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: Spacing.two,
  },
  pressed: {
    opacity: 0.76,
  },
});
