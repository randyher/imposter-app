import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { DAILY_QUESTION_COUNT } from '../config/features';

function fmt(v) {
  return v % 1 === 0 ? String(v) : v.toFixed(1);
}

function getTimeToMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight - now;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
}

const CATEGORY_LABELS = {
  nba: 'NBA', mlb: 'MLB', nfl: 'NFL',
  pokemon: 'Pokémon', smash: 'Smash Bros', mcu: 'MCU', hp: 'Harry Potter',
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

export default function AlreadyPlayedScreen({ dailyResult, category, showPrompt, onBack }) {
  const [countdown, setCountdown] = useState(getTimeToMidnight());

  useEffect(() => {
    const id = setInterval(() => setCountdown(getTimeToMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  const { score, hist = [] } = dailyResult ?? {};
  const correct = hist.filter((h) => h.ok).length;
  const total = hist.length;

  function handleShare() {
    Share.share({ message: buildShareText(score, hist, category, showPrompt) });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Already played today</Text>
      <Text style={styles.score}>{fmt(score ?? 0)}</Text>
      <Text style={styles.scoreLbl}>POINTS  ·  {correct}/{total} correct</Text>

      <View style={styles.countdownBox}>
        <Text style={styles.countdownLbl}>Next challenge in</Text>
        <Text style={styles.countdown}>{countdown}</Text>
      </View>

      <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.75}>
        <Text style={styles.shareBtnText}>Share Result</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={onBack} activeOpacity={0.8}>
        <Text style={styles.btnText}>← Categories</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  checkmark: {
    fontSize: 40,
    color: '#22c55e',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 0.5,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  score: {
    fontSize: 96,
    fontWeight: '900',
    lineHeight: 96,
    color: '#111',
  },
  scoreLbl: {
    fontSize: 13,
    color: '#888',
    letterSpacing: 1,
    marginTop: 4,
    marginBottom: 32,
  },
  countdownBox: {
    alignItems: 'center',
    marginBottom: 40,
  },
  countdownLbl: {
    fontSize: 12,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  countdown: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    letterSpacing: 1,
  },
  shareBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 12,
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
  btn: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
