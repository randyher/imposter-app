import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CATEGORIES = [
  { id: 'nba', name: 'NBA', sport: 'Basketball', locked: false, tag: 'Free' },
  { id: 'mlb', name: 'MLB', sport: 'Baseball', locked: false, tag: 'Free' },
  { id: 'nfl', name: 'NFL', sport: 'Football', locked: false, tag: 'Free' },
];

export default function CategoryScreen({ onSelect, onBack }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Choose a category</Text>

      {CATEGORIES.map((c) => (
        <TouchableOpacity
          key={c.id}
          onPress={!c.locked ? () => onSelect(c.id) : undefined}
          activeOpacity={c.locked ? 1 : 0.75}
          style={[styles.catCard, c.locked && styles.catCardLocked]}
        >
          <View>
            <Text style={styles.catName}>{c.name}</Text>
            <Text style={styles.catSport}>{c.sport}</Text>
          </View>
          <View style={[styles.tag, c.locked ? styles.tagLocked : styles.tagFree]}>
            <Text style={[styles.tagText, c.locked ? styles.tagTextLocked : styles.tagTextFree]}>
              {c.tag}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  backBtn: {
    paddingBottom: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#888',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 16,
    color: '#111',
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
  catSport: {
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
