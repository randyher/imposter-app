import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Share } from 'react-native';
import { DAILY_QUESTION_COUNT } from '../config/features';

function fmt(v) {
  return v % 1 === 0 ? String(v) : v.toFixed(1);
}

const CATEGORY_LABELS = {
  nba:     'NBA',
  mlb:     'MLB',
  nfl:     'NFL',
  pokemon: 'Pokémon',
  smash:   'Smash Bros',
  mcu:     'MCU',
  hp:      'Harry Potter',
};

function getBadge(score) {
  if (score >= 15) return { emoji: '💎', label: 'Perfect' };
  if (score >= 14) return { emoji: '🥇', label: 'Gold' };
  if (score >= 11) return { emoji: '🥈', label: 'Silver' };
  if (score >= 9)  return { emoji: '🥉', label: 'Bronze' };
  return null;
}

function getHumanDate() {
  return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

function buildShareText(score, hist, category, showPrompt) {
  const label = CATEGORY_LABELS[category] ?? category.toUpperCase();
  const badge = getBadge(score);
  const emojis = hist.map((h) => (h.skip ? '⬜' : h.ok ? '🟩' : '🟥'));
  const emojiRows = [];
  for (let i = 0; i < emojis.length; i += 5) {
    emojiRows.push(emojis.slice(i, i + 5).join(''));
  }
  const badgePart = badge ? `${badge.emoji} ${fmt(score)}/${DAILY_QUESTION_COUNT}` : `Score: ${fmt(score)}`;
  const hintsPart = showPrompt ? '' : '  |  🔥 No Hints';

  return [
    `Daily Imposter`,
    `${label} Edition — ${getHumanDate()}`,
    `${badgePart}${hintsPart}`,
    ``,
    ...emojiRows,
    ``,
    `oddoneout.app`,
  ].join('\n');
}

export default function ResultsScreen({ score, hist, category, showPrompt, onPlayAgain, onCategories }) {
  const correct = hist.filter((h) => h.ok).length;
  const skipped = hist.filter((h) => h.skip).length;
  const wrong = hist.filter((h) => !h.ok && !h.skip).length;
  const tried = hist.length - skipped;
  const acc = tried > 0 ? Math.round((correct / tried) * 100) : 0;
  const badge = getBadge(score);

  const stats = [
    ['Questions answered', hist.length],
    ['Correct', correct],
    ['Wrong', wrong],
    ['Skipped', skipped],
    ['Accuracy', acc + '%'],
  ];

  function handleShare() {
    Share.share({ message: buildShareText(score, hist, category, showPrompt) });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.scoreBlock}>
        {badge ? (
          <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
        ) : null}
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

      <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.75}>
        <Text style={styles.shareBtnText}>Share Result</Text>
      </TouchableOpacity>

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
  badgeEmoji: {
    fontSize: 48,
    marginBottom: 4,
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
    marginBottom: 16,
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
  shareBtn: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  shareBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    letterSpacing: 0.3,
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
