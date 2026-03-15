import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import Logo from '../components/Logo';

const BADGE_COLORS = {
  nba:     { bg: '#fef3c7', text: '#92400e' },
  mlb:     { bg: '#dbeafe', text: '#1e40af' },
  nfl:     { bg: '#fee2e2', text: '#991b1b' },
  pokemon: { bg: '#ecfccb', text: '#3f6212' },
  smash:   { bg: '#fff7ed', text: '#c2410c' },
  mcu:     { bg: '#ede9fe', text: '#5b21b6' },
  hp:      { bg: '#fce7f3', text: '#9d174d' },
};

const CATEGORY_LABELS = {
  nba:     'NBA',
  mlb:     'MLB',
  nfl:     'NFL',
  pokemon: 'Pokémon',
  smash:   'Smash Bros',
  mcu:     'MCU',
  hp:      'Harry Potter',
};

export default function LobbyScreen({ category, onStart, onBack, showPrompt, onTogglePrompt }) {
  const badge = BADGE_COLORS[category] ?? BADGE_COLORS.nba;
  const label = CATEGORY_LABELS[category] ?? category.toUpperCase();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
        <Text style={styles.backText}>← Categories</Text>
      </TouchableOpacity>

      <View style={[styles.badge, { backgroundColor: badge.bg }]}>
        <Text style={[styles.badgeText, { color: badge.text }]}>{label} Edition</Text>
      </View>

      <Logo size={64} />

      <Text style={styles.tagline}>
        3 belong. 1 doesn't.{'\n'}No hints. Figure it out.
      </Text>

      <View style={styles.rulesRow}>
        <Text style={styles.rule}><Text style={styles.bold}>+1</Text> correct</Text>
        <Text style={styles.rule}><Text style={styles.bold}>−1</Text> wrong</Text>
        <Text style={styles.rule}><Text style={styles.bold}>−0.5</Text> skip</Text>
      </View>

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Show Prompt?</Text>
        <Switch
          value={showPrompt}
          onValueChange={onTogglePrompt}
          trackColor={{ false: '#e5e5e5', true: '#111' }}
          thumbColor="#fff"
        />
      </View>

      <TouchableOpacity style={styles.btnMain} onPress={onStart} activeOpacity={0.85}>
        <Text style={styles.btnMainText}>START GAME</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingBottom: 20,
  },
  backText: {
    color: '#888',
    fontSize: 13,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    color: '#666',
    marginTop: 12,
    marginBottom: 12,
    lineHeight: 22,
    textAlign: 'center',
  },
  rulesRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 36,
  },
  rule: {
    fontSize: 13,
    color: '#666',
  },
  bold: {
    fontWeight: '700',
    color: '#111',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  btnMain: {
    backgroundColor: '#111',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
  btnMainText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
