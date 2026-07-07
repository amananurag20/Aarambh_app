import { SymbolView } from 'expo-symbols';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAppState } from '@/hooks/app-state';
import { useTheme } from '@/hooks/use-theme';

const totalSeconds = 300;
const breathCycleSeconds = 12;
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
  const breathScale = useRef(new Animated.Value(0)).current;
  const elapsedSeconds = totalSeconds - secondsLeft;
  const breathPosition = elapsedSeconds % breathCycleSeconds;
  const breathPhase =
    breathPosition < 4
      ? 'Breathe in'
      : breathPosition < 6
        ? 'Hold'
        : breathPosition < 10
          ? 'Breathe out'
          : 'Hold';
  const breathHint =
    breathPhase === 'Breathe in'
      ? 'Let the circle rise.'
      : breathPhase === 'Breathe out'
        ? 'Let it go down slowly.'
        : 'Stay still and relaxed.';

  useEffect(() => {
    if (!running) {
      breathScale.stopAnimation();
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(breathScale, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(breathScale, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(2000),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [breathScale, running]);

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
          <View style={styles.breathingStage}>
            <Animated.View
              style={[
                styles.breathingCircle,
                {
                  borderColor: theme.accent,
                  backgroundColor: theme.accentSoft,
                  transform: [
                    {
                      scale: breathScale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.86, 1.14],
                      }),
                    },
                  ],
                },
              ]}>
              <ThemedText style={[styles.timer, { color: theme.accentStrong }]}>
                {formatTime(secondsLeft)}
              </ThemedText>
            </Animated.View>
            <View style={[styles.guideLine, { backgroundColor: theme.backgroundSelected }]}>
              <Animated.View
                style={[
                  styles.guideDot,
                  {
                    backgroundColor: theme.accentStrong,
                    transform: [
                      {
                        translateY: breathScale.interpolate({
                          inputRange: [0, 1],
                          outputRange: [58, -58],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.phaseBlock}>
            <ThemedText style={[styles.phaseText, { color: theme.accentStrong }]}>
              {running ? breathPhase : 'Ready'}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
              {running ? breathHint : 'Tap begin and follow the breathing circle.'}
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
  breathingStage: {
    alignItems: 'center',
    height: 230,
    justifyContent: 'center',
    width: '100%',
  },
  breathingCircle: {
    alignItems: 'center',
    borderRadius: 92,
    borderWidth: 8,
    height: 184,
    justifyContent: 'center',
    width: 184,
  },
  guideLine: {
    borderRadius: 4,
    height: 140,
    opacity: 0.8,
    position: 'absolute',
    right: Spacing.three,
    width: 6,
  },
  guideDot: {
    borderRadius: 16,
    height: 32,
    left: -13,
    position: 'absolute',
    top: 54,
    width: 32,
  },
  timer: {
    fontSize: 46,
    fontWeight: 900,
  },
  phaseBlock: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  phaseText: {
    fontSize: 26,
    fontWeight: 900,
    lineHeight: 32,
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
