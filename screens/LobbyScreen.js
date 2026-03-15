import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import Logo from '../components/Logo';

export default function LobbyScreen({ category, onStart, onBack, showPrompt, onTogglePrompt }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
        <Text style={styles.backText}>← Categories</Text>
      </TouchableOpacity>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{category.toUpperCase()} Edition</Text>
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
    backgroundColor: '#fef3c7',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
  badgeText: {
    color: '#92400e',
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
