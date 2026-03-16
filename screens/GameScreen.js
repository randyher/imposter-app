import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { DAILY_DURATION_SECONDS } from '../config/features';

const TOTAL_TIME = DAILY_DURATION_SECONDS;
const { width: SCREEN_W } = Dimensions.get('window');
// Card width: (screen - horizontal padding*2 - gap) / 2
const CARD_W = (SCREEN_W - 32 - 10) / 2;

function fmt(v) {
  return v % 1 === 0 ? String(v) : v.toFixed(1);
}

function fmtTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export default function GameScreen({ qs, onEnd, showPrompt }) {
  const [cur, setCur] = useState(0);
  const [score, setScore] = useState(0);
  const [tLeft, setTLeft] = useState(TOTAL_TIME);
  const [busy, setBusy] = useState(false);
  const [xpl, setXpl] = useState('');
  const [chosen, setChosen] = useState(null);
  const [hist, setHist] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (tLeft === 0) {
      onEnd({ score, hist });
    }
  }, [tLeft]);

  function doAnswer(idx) {
    if (busy) return;
    setBusy(true);
    setChosen(idx);
    const q = qs[cur];
    const ok = idx === q.ans;
    const newScore = score + (ok ? 1 : -1);
    const newHist = [...hist, { ok, skip: false }];
    setScore(newScore);
    setHist(newHist);
    setXpl(q.explanation);
    setTimeout(() => {
      const next = cur + 1;
      if (next >= qs.length) {
        clearInterval(timerRef.current);
        onEnd({ score: newScore, hist: newHist });
      } else {
        setCur(next);
        setBusy(false);
        setXpl('');
        setChosen(null);
      }
    }, 1400);
  }

  function doSkip() {
    if (busy) return;
    setBusy(true);
    const q = qs[cur];
    const newScore = score - 0.5;
    const newHist = [...hist, { ok: false, skip: true }];
    setScore(newScore);
    setHist(newHist);
    setChosen('skip');
    setXpl(q.explanation);
    setTimeout(() => {
      const next = cur + 1;
      if (next >= qs.length) {
        clearInterval(timerRef.current);
        onEnd({ score: newScore, hist: newHist });
      } else {
        setCur(next);
        setBusy(false);
        setXpl('');
        setChosen(null);
      }
    }, 1000);
  }

  const q = qs[cur];
  const timerRed = tLeft <= 20;
  const progressPct = (tLeft / TOTAL_TIME) * 100;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.lbl}>Time</Text>
          <Text style={[styles.timerText, timerRed && styles.timerRed]}>
            {fmtTime(tLeft)}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.lbl}>Score</Text>
          <Text style={styles.scoreText}>{fmt(score)}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
      </View>

      {showPrompt && q.prompt ? (
        <Text style={styles.prompt}>{q.prompt}</Text>
      ) : (
        <Text style={styles.findLbl}>Who's the imposter?</Text>
      )}

      {/* 2×2 answer grid */}
      <View style={styles.grid}>
        {q.opts.map((name, i) => {
          let cardStyle = styles.cardDefault;
          let textStyle = styles.cardTextDefault;
          if (chosen !== null) {
            if (i === q.ans) {
              cardStyle = styles.cardCorrect;
              textStyle = styles.cardTextCorrect;
            } else if (i === chosen && chosen !== q.ans) {
              cardStyle = styles.cardWrong;
              textStyle = styles.cardTextWrong;
            }
          }
          return (
            <TouchableOpacity
              key={i}
              onPress={() => doAnswer(i)}
              disabled={busy}
              activeOpacity={0.8}
              style={[styles.card, cardStyle]}
            >
              <Text style={[styles.cardText, textStyle]}>{name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={doSkip}
        disabled={busy}
        activeOpacity={0.7}
        style={[styles.skipBtn, busy && styles.skipBtnDisabled]}
      >
        <Text style={styles.skipText}>Skip (−0.5)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { clearInterval(timerRef.current); onEnd({ score, hist }); }}
        activeOpacity={0.7}
        style={styles.endBtn}
      >
        <Text style={styles.endText}>End Game</Text>
      </TouchableOpacity>

      {xpl ? <Text style={styles.explanation}>{xpl}</Text> : null}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  lbl: {
    fontSize: 11,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  timerText: {
    fontSize: 52,
    fontWeight: '900',
    lineHeight: 52,
    color: '#111',
  },
  timerRed: {
    color: '#dc2626',
  },
  scoreText: {
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 38,
    color: '#111',
  },
  progressTrack: {
    height: 3,
    backgroundColor: '#e5e5e5',
    borderRadius: 2,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#111',
    borderRadius: 2,
  },
  findLbl: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#888',
    textAlign: 'center',
    marginBottom: 14,
  },
  prompt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  card: {
    width: CARD_W,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 12,
    minHeight: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cardDefault: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
  },
  cardCorrect: {
    backgroundColor: '#d1fae5',
    borderColor: '#6ee7b7',
  },
  cardWrong: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
  },
  cardText: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
  cardTextDefault: {
    color: '#111',
  },
  cardTextCorrect: {
    color: '#065f46',
  },
  cardTextWrong: {
    color: '#991b1b',
  },
  skipBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  skipBtnDisabled: {
    opacity: 0.35,
  },
  skipText: {
    color: '#888',
    fontSize: 13,
  },
  endBtn: {
    width: '100%',
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#fecaca',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  endText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '500',
  },
  explanation: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 18,
  },
});
