import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

const SCREEN_W = Dimensions.get('window').width;
import { getStreak, getDailyResult } from '../lib/dailyStorage';

function getBadge(score) {
  if (score >= 15) return '💎';
  if (score >= 14) return '🥇';
  if (score >= 11) return '🥈';
  if (score >= 9)  return '🥉';
  return null;
}

// Required for LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ALL_CATEGORY_IDS = ['nba', 'mlb', 'nfl', 'pokemon', 'smash', 'mcu', 'hp'];

const SECTIONS = [
  {
    id: 'sports',
    title: '🏆  SPORTS',
    categories: [
      { id: 'nba', name: 'NBA', genre: 'Basketball' },
      { id: 'mlb', name: 'MLB', genre: 'Baseball' },
      { id: 'nfl', name: 'NFL', genre: 'Football' },
    ],
  },
  {
    id: 'gaming',
    title: '🎮  GAMING',
    categories: [
      { id: 'pokemon', name: 'Pokémon', genre: 'Monster Collector' },
      { id: 'smash', name: 'Smash Bros', genre: 'Nintendo Platform Fighter' },
    ],
  },
  {
    id: 'entertainment',
    title: '🎬  ENTERTAINMENT',
    categories: [
      { id: 'mcu', name: 'MCU', genre: 'Marvel Cinematic Universe' },
      { id: 'hp', name: 'Harry Potter', genre: 'Wizarding World' },
    ],
  },
];

function StreakIndicator({ streak }) {
  if (streak < 3) return null;
  if (streak === 3) return <Text style={styles.streakText}>🔥</Text>;
  if (streak === 4) return <Text style={styles.streakText}>🔥🔥</Text>;
  return <Text style={styles.streakText}>{streak}🔥</Text>;
}

function CategoryCard({ cat, streak, badge, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(cat.id)}
      activeOpacity={0.75}
      style={styles.catCard}
    >
      <View style={styles.catInfo}>
        <Text style={styles.catName}>{cat.name}</Text>
        {cat.genre ? <Text style={styles.catGenre}>{cat.genre}</Text> : null}
      </View>
      <StreakIndicator streak={streak} />
      {badge ? <Text style={styles.badgeEmoji}>{badge}</Text> : null}
    </TouchableOpacity>
  );
}

function CollapsibleSection({ section, streaks, badges, onSelect }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen((prev) => !prev);
  }

  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader} onPress={toggle} activeOpacity={0.7}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Text style={[styles.chevron, { transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }]}>
          ›
        </Text>
      </TouchableOpacity>
      {isOpen &&
        section.categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            streak={streaks[cat.id] ?? 0}
            badge={badges[cat.id] ?? null}
            onSelect={onSelect}
          />
        ))}
    </View>
  );
}

export default function CategoryScreen({ onSelect, onBack }) {
  const [streaks, setStreaks] = useState({});
  const [badges, setBadges] = useState({});

  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dx > 10 && Math.abs(g.dx) > Math.abs(g.dy),
      onPanResponderMove: (_, g) => {
        if (g.dx > 0) translateX.setValue(g.dx);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dx > SCREEN_W / 3 || g.vx > 0.5) {
          Animated.timing(translateX, {
            toValue: SCREEN_W,
            duration: 180,
            useNativeDriver: true,
          }).start(() => onBack());
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
      },
    })
  ).current;

  useEffect(() => {
    async function loadData() {
      const [streakEntries, badgeEntries] = await Promise.all([
        Promise.all(ALL_CATEGORY_IDS.map(async (id) => {
          const s = await getStreak(id);
          return [id, s.current];
        })),
        Promise.all(ALL_CATEGORY_IDS.map(async (id) => {
          const r = await getDailyResult(id);
          return [id, r ? getBadge(r.score) : null];
        })),
      ]);
      setStreaks(Object.fromEntries(streakEntries));
      setBadges(Object.fromEntries(badgeEntries));
    }
    loadData();
  }, []);

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX }] }} {...panResponder.panHandlers}>
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.pageTitle}>Choose a category</Text>

      {SECTIONS.map((section) => (
        <CollapsibleSection
          key={section.id}
          section={section}
          streaks={streaks}
          badges={badges}
          onSelect={onSelect}
        />
      ))}
    </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
  backBtn: {
    paddingBottom: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#888',
    fontSize: 13,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    color: '#111',
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#888',
    textTransform: 'uppercase',
  },
  chevron: {
    fontSize: 22,
    color: '#aaa',
    lineHeight: 24,
  },
  catCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  badgeEmoji: {
    fontSize: 22,
    marginLeft: 8,
  },
  catInfo: {
    flex: 1,
    marginLeft: 10,
  },
  catName: {
    fontWeight: '800',
    fontSize: 32,
    letterSpacing: 0.5,
    color: '#111',
  },
  catGenre: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
  streakText: {
    fontSize: 18,
  },
});
