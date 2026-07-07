import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';

import { ThemedText } from './themed-text';

import { Colors, Spacing } from '@/constants/theme';

const tabs = [
  {
    name: 'home',
    href: '/',
    label: 'Home',
    icon: { ios: 'house.fill', android: 'home', web: 'home' },
  },
  {
    name: 'coach',
    href: '/coach',
    label: 'Coach',
    icon: { ios: 'message.fill', android: 'chat', web: 'chat' },
  },
  {
    name: 'journal',
    href: '/journal',
    label: 'Journal',
    icon: { ios: 'doc.text.fill', android: 'edit_note', web: 'edit_note' },
  },
  {
    name: 'progress',
    href: '/explore',
    label: 'Progress',
    icon: { ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' },
  },
  {
    name: 'more',
    href: '/more',
    label: 'More',
    icon: { ios: 'line.3.horizontal', android: 'menu', web: 'menu' },
  },
] as const;

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          {tabs.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton label={tab.label} icon={tab.icon} />
            </TabTrigger>
          ))}
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  label,
  icon,
  isFocused,
  ...props
}: TabTriggerSlotProps & {
  label: string;
  icon: (typeof tabs)[number]['icon'];
}) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}>
      <SymbolView
        name={icon}
        tintColor={isFocused ? colors.accent : colors.textSecondary}
        size={24}
      />
      <ThemedText
        type="small"
        style={[styles.tabLabel, isFocused && { color: colors.accent }]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View pointerEvents="box-none" style={styles.tabListContainer}>
      <View
        {...props}
        style={[
          styles.innerContainer,
          {
            backgroundColor: colors.backgroundElement,
            borderColor: colors.cardBorder,
            shadowColor: '#000000',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    alignItems: 'center',
    bottom: 0,
    left: 0,
    paddingBottom: Spacing.three,
    paddingHorizontal: Spacing.three,
    position: 'absolute',
    right: 0,
  },
  innerContainer: {
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.one,
    justifyContent: 'space-between',
    maxWidth: 560,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.24,
    shadowRadius: 28,
    width: '100%',
  },
  tabButton: {
    alignItems: 'center',
    borderRadius: 18,
    flex: 1,
    gap: Spacing.one,
    minHeight: 58,
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});
