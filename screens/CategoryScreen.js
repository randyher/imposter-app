import { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
} from 'react-native';

// Required for LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SECTIONS = [
  {
    id: 'sports',
    title: '🏆  SPORTS',
    categories: [
      { id: 'nba', name: 'NBA', genre: 'Basketball', locked: false, tag: 'Free' },
      { id: 'mlb', name: 'MLB', genre: 'Baseball', locked: false, tag: 'Free' },
      { id: 'nfl', name: 'NFL', genre: 'Football', locked: false, tag: 'Free' },
    ],
  },
  {
    id: 'gaming',
    title: '🎮  GAMING',
    categories: [
      { id: 'pokemon', name: 'Pokémon', genre: 'Gaming', locked: false, tag: 'Free' },
    ],
  },
  {
    id: 'entertainment',
    title: '🎬  ENTERTAINMENT',
    categories: [
      { id: 'mcu', name: 'MCU', genre: 'Marvel Cinematic Universe', locked: false, tag: 'Free' },
    ],
  },
];

function CategoryCard({ cat, onSelect }) {
  return (
    <TouchableOpacity
      onPress={!cat.locked ? () => onSelect(cat.id) : undefined}
      activeOpacity={cat.locked ? 1 : 0.75}
      style={[styles.catCard, cat.locked && styles.catCardLocked]}
    >
      <View>
        <Text style={styles.catName}>{cat.name}</Text>
        {cat.genre ? <Text style={styles.catGenre}>{cat.genre}</Text> : null}
      </View>
      <View style={[styles.tag, cat.locked ? styles.tagLocked : styles.tagFree]}>
        <Text style={[styles.tagText, cat.locked ? styles.tagTextLocked : styles.tagTextFree]}>
          {cat.tag}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function CollapsibleSection({ section, onSelect }) {
  const [isOpen, setIsOpen] = useState(true);
  const rotateAnim = useRef(new Animated.Value(1)).current;

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setIsOpen((prev) => !prev);
  }

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader} onPress={toggle} activeOpacity={0.7}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Animated.Text style={[styles.chevron, { transform: [{ rotate: rotation }] }]}>
          ›
        </Animated.Text>
      </TouchableOpacity>
      {isOpen &&
        section.categories.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} onSelect={onSelect} />
        ))}
    </View>
  );
}

export default function CategoryScreen({ onSelect, onBack }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.pageTitle}>Choose a category</Text>

      {SECTIONS.map((section) => (
        <CollapsibleSection key={section.id} section={section} onSelect={onSelect} />
      ))}
    </ScrollView>
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
  catCardLocked: {
    opacity: 0.4,
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
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  tagFree: {
    backgroundColor: '#d1fae5',
  },
  tagLocked: {
    backgroundColor: '#f3f4f6',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  tagTextFree: {
    color: '#065f46',
  },
  tagTextLocked: {
    color: '#9ca3af',
  },
});
