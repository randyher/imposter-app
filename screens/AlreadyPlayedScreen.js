import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

export default function AlreadyPlayedScreen({ dailyResult, onBack }) {
  const [countdown, setCountdown] = useState(getTimeToMidnight());

  useEffect(() => {
    const id = setInterval(() => setCountdown(getTimeToMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  const { score, hist = [] } = dailyResult ?? {};
  const correct = hist.filter((h) => h.ok).length;
  const total = hist.length;

  return (
    <View style={styles.container}>
      <Text style={styles.checkmark}>✓</Text>
      <Text style={styles.title}>Already played today</Text>
      <Text style={styles.score}>{fmt(score ?? 0)}</Text>
      <Text style={styles.scoreLbl}>POINTS  ·  {correct}/{total} correct</Text>

      <View style={styles.countdownBox}>
        <Text style={styles.countdownLbl}>Next challenge in</Text>
        <Text style={styles.countdown}>{countdown}</Text>
      </View>

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
  btn: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
