import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

function fmt(v) {
  return v % 1 === 0 ? String(v) : v.toFixed(1);
}

const GAMING_CATEGORIES = ['pokemon', 'smash'];

function getVerdict(score, category) {
  const isGaming = GAMING_CATEGORIES.includes(category);
  const lowVerdict = isGaming ? 'KEEP PLAYING' : 'KEEP WATCHING';
  if (score >= 12) return 'ELITE';
  if (score >= 8) return 'SOLID GAME';
  if (score >= 4) return 'DECENT EFFORT';
  return lowVerdict;
}

export default function ResultsScreen({ score, hist, category, onPlayAgain, onCategories }) {
  const correct = hist.filter((h) => h.ok).length;
  const skipped = hist.filter((h) => h.skip).length;
  const wrong = hist.filter((h) => !h.ok && !h.skip).length;
  const tried = hist.length - skipped;
  const acc = tried > 0 ? Math.round((correct / tried) * 100) : 0;
  const verdict = getVerdict(score, category);

  const stats = [
    ['Questions answered', hist.length],
    ['Correct', correct],
    ['Wrong', wrong],
    ['Skipped', skipped],
    ['Accuracy', acc + '%'],
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.scoreBlock}>
        <Text style={styles.verdict}>{verdict}</Text>
        <Text style={styles.bigScore}>{fmt(score)}</Text>
        <Text style={styles.endLbl}>POINTS</Text>
      </View>

      <View style={styles.statsBlock}>
        {stats.map(([label, value]) => (
          <View key={label} style={styles.statRow}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btnMain, { flex: 1 }]}
          onPress={onPlayAgain}
          activeOpacity={0.85}
        >
          <Text style={styles.btnMainText}>PLAY AGAIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnGhost}
          onPress={onCategories}
          activeOpacity={0.7}
        >
          <Text style={styles.btnGhostText}>Categories</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  scoreBlock: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  verdict: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#888',
    marginBottom: 6,
    textAlign: 'center',
  },
  bigScore: {
    fontSize: 96,
    fontWeight: '900',
    lineHeight: 96,
    color: '#111',
  },
  endLbl: {
    fontSize: 12,
    color: '#888',
    letterSpacing: 2,
    marginTop: 4,
    marginBottom: 8,
  },
  statsBlock: {
    marginBottom: 24,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 13,
    color: '#888',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btnMain: {
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnMainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  btnGhost: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhostText: {
    color: '#666',
    fontSize: 13,
  },
});
