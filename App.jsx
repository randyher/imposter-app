/**
 * IMPOSTER - NBA Edition
 *
 * This file is written as a React component (web prototype).
 * When porting to React Native, swap:
 *   div       → View
 *   p/span    → Text
 *   button    → TouchableOpacity + Text
 *   style={}  → StyleSheet.create({})
 *
 * Game logic (generateGame, PLAYERS) stays identical.
 */

import { useState, useEffect, useRef } from "react";
import PLAYERS from "./data/players.json";
import { generateGame } from "./utils/questionEngine";

const TOTAL_TIME = 180;

function fmt(v) {
  return v % 1 === 0 ? String(v) : v.toFixed(1);
}

function fmtTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function Logo({ size = 80 }) {
  return (
    <div
      style={{
        fontFamily: "Impact, 'Arial Narrow', sans-serif",
        fontSize: size,
        fontWeight: 900,
        letterSpacing: -2,
        lineHeight: 1,
        color: "#111",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      IMPOS
      <span style={{ position: "relative", display: "inline-block" }}>
        {/* Disguise SVG — glasses + mustache on the T */}
        <svg
          style={{
            position: "absolute",
            top: -(size * 0.28),
            left: "50%",
            transform: "translateX(-50%)",
            width: size * 0.9,
            height: size * 0.58,
            overflow: "visible",
            pointerEvents: "none",
          }}
          viewBox="0 0 72 46"
        >
          {/* Left lens */}
          <rect x="0" y="0" width="29" height="21" rx="10" fill="#111" />
          <rect
            x="3"
            y="3"
            width="23"
            height="15"
            rx="7"
            fill="#aad4f5"
            opacity="0.6"
          />
          {/* Right lens */}
          <rect x="43" y="0" width="29" height="21" rx="10" fill="#111" />
          <rect
            x="46"
            y="3"
            width="23"
            height="15"
            rx="7"
            fill="#aad4f5"
            opacity="0.6"
          />
          {/* Bridge */}
          <rect x="29" y="8" width="14" height="6" rx="3" fill="#111" />
          {/* Mustache */}
          <path
            d="M10 34 C10 26 21 23 29 29 C31 31 33 31 35 29 C43 23 58 26 60 34 C56 42 44 39 36 34 C34 32 32 32 30 34 C22 39 14 42 10 34 Z"
            fill="#111"
          />
        </svg>
        T
      </span>
      ER
    </div>
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function HomeScreen({ onPlay }) {
  return (
    <div style={styles.centerColumn}>
      <Logo size={80} />
      <p style={styles.tagline}>
        3 belong. 1 doesn't.
        <br />
        No hints. Figure it out.
      </p>
      <div style={styles.rulesRow}>
        <span>
          <strong>+1</strong> correct
        </span>
        <span>
          <strong>−1</strong> wrong
        </span>
        <span>
          <strong>−0.5</strong> skip
        </span>
      </div>
      <button style={styles.btnMain} onClick={onPlay}>
        PLAY
      </button>
    </div>
  );
}

function CategoryScreen({ onSelect, onBack }) {
  const categories = [
    { id: "nba", name: "NBA", sport: "Basketball", locked: false, tag: "Free" },
    {
      id: "mlb",
      name: "MLB",
      sport: "Baseball",
      locked: true,
      tag: "Coming soon",
    },
    {
      id: "nfl",
      name: "NFL",
      sport: "Football",
      locked: true,
      tag: "Coming soon",
    },
  ];

  return (
    <div style={styles.screen}>
      <button style={styles.backBtn} onClick={onBack}>
        ← Back
      </button>
      <div style={styles.sectionTitle}>Choose a category</div>
      {categories.map((c) => (
        <div
          key={c.id}
          onClick={!c.locked ? () => onSelect(c.id) : undefined}
          style={{
            ...styles.catCard,
            opacity: c.locked ? 0.4 : 1,
            cursor: c.locked ? "default" : "pointer",
          }}
        >
          <div>
            <div style={styles.catName}>{c.name}</div>
            <div style={styles.catSport}>{c.sport}</div>
          </div>
          <span
            style={{
              ...styles.tag,
              background: c.locked ? "#f3f4f6" : "#d1fae5",
              color: c.locked ? "#9ca3af" : "#065f46",
            }}
          >
            {c.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

function LobbyScreen({ category, onStart, onBack }) {
  return (
    <div style={styles.centerColumn}>
      <button
        style={{ ...styles.backBtn, alignSelf: "flex-start" }}
        onClick={onBack}
      >
        ← Categories
      </button>
      <span style={styles.badge}>{category.toUpperCase()} Edition</span>
      <Logo size={64} />
      <p style={{ ...styles.tagline, marginTop: 8 }}>
        3 belong. 1 doesn't.
        <br />
        No hints. Figure it out.
      </p>
      <div style={styles.rulesRow}>
        <span>
          <strong>+1</strong> correct
        </span>
        <span>
          <strong>−1</strong> wrong
        </span>
        <span>
          <strong>−0.5</strong> skip
        </span>
      </div>
      <button style={styles.btnMain} onClick={onStart}>
        START GAME
      </button>
    </div>
  );
}

function GameScreen({ qs, onEnd }) {
  const [cur, setCur] = useState(0);
  const [score, setScore] = useState(0);
  const [tLeft, setTLeft] = useState(TOTAL_TIME);
  const [busy, setBusy] = useState(false);
  const [xpl, setXpl] = useState("");
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
        setXpl("");
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
    setChosen("skip");
    setXpl(q.explanation);
    setTimeout(() => {
      const next = cur + 1;
      if (next >= qs.length) {
        clearInterval(timerRef.current);
        onEnd({ score: newScore, hist: newHist });
      } else {
        setCur(next);
        setBusy(false);
        setXpl("");
        setChosen(null);
      }
    }, 1000);
  }

  const q = qs[cur];
  const timerRed = tLeft <= 20;

  return (
    <div style={styles.screen}>
      {/* Header */}
      <div style={styles.gameHeader}>
        <div>
          <div style={styles.lbl}>Time</div>
          <div
            style={{
              ...styles.timerText,
              color: timerRed ? "#dc2626" : "#111",
            }}
          >
            {fmtTime(tLeft)}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={styles.lbl}>Score</div>
          <div style={styles.scoreText}>{fmt(score)}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressFill,
            width: `${(tLeft / TOTAL_TIME) * 100}%`,
          }}
        />
      </div>

      <div style={styles.findLbl}>Who's the imposter?</div>

      {/* Answer grid */}
      <div style={styles.grid}>
        {q.opts.map((name, i) => {
          let bg = "#fff",
            border = "1px solid #e0e0e0",
            color = "#111";
          if (chosen !== null) {
            if (i === q.ans) {
              bg = "#d1fae5";
              border = "1px solid #6ee7b7";
              color = "#065f46";
            } else if (i === chosen && chosen !== q.ans) {
              bg = "#fee2e2";
              border = "1px solid #fca5a5";
              color = "#991b1b";
            }
          }
          return (
            <button
              key={i}
              onClick={() => doAnswer(i)}
              style={{
                ...styles.card,
                background: bg,
                border,
                color,
                cursor: busy ? "default" : "pointer",
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      <button
        onClick={doSkip}
        disabled={busy}
        style={{ ...styles.skipBtn, opacity: busy ? 0.35 : 1 }}
      >
        Skip (−0.5)
      </button>

      <div style={styles.explanation}>{xpl}</div>
    </div>
  );
}

function ResultsScreen({ score, hist, onPlayAgain, onCategories }) {
  const correct = hist.filter((h) => h.ok).length;
  const skipped = hist.filter((h) => h.skip).length;
  const wrong = hist.filter((h) => !h.ok && !h.skip).length;
  const tried = hist.length - skipped;
  const acc = tried > 0 ? Math.round((correct / tried) * 100) : 0;
  const verdict =
    score >= 12
      ? "BASKETBALL IQ: ELITE"
      : score >= 8
      ? "SOLID GAME"
      : score >= 4
      ? "DECENT EFFORT"
      : score >= 0
      ? "KEEP WATCHING"
      : "WATCH MORE NBA";

  return (
    <div style={styles.screen}>
      <div style={{ textAlign: "center", padding: "1rem 0 1.25rem" }}>
        <div style={styles.verdict}>{verdict}</div>
        <div style={styles.bigScore}>{fmt(score)}</div>
        <div style={styles.endLbl}>points</div>
      </div>
      {[
        ["Questions answered", hist.length],
        ["Correct", correct],
        ["Wrong", wrong],
        ["Skipped", skipped],
        ["Accuracy", acc + "%"],
      ].map(([label, value]) => (
        <div key={label} style={styles.statRow}>
          <span>{label}</span>
          <span style={{ fontWeight: 500, color: "#111" }}>{value}</span>
        </div>
      ))}
      <div style={styles.endBtns}>
        <button style={{ ...styles.btnMain, flex: 1 }} onClick={onPlayAgain}>
          PLAY AGAIN
        </button>
        <button style={styles.btnGhost} onClick={onCategories}>
          Categories
        </button>
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);

  function handleStartGame() {
    const qs = generateGame(PLAYERS);
    setQuestions(qs);
    setResult(null);
    setScreen("game");
  }

  function handleEndGame(r) {
    setResult(r);
    setScreen("results");
  }

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        padding: "0 16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {screen === "home" && <HomeScreen onPlay={() => setScreen("cats")} />}
      {screen === "cats" && (
        <CategoryScreen
          onSelect={(id) => {
            setSelectedCategory(id);
            setScreen("lobby");
          }}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "lobby" && (
        <LobbyScreen
          category={selectedCategory}
          onStart={handleStartGame}
          onBack={() => setScreen("cats")}
        />
      )}
      {screen === "game" && <GameScreen qs={questions} onEnd={handleEndGame} />}
      {screen === "results" && result && (
        <ResultsScreen
          score={result.score}
          hist={result.hist}
          onPlayAgain={handleStartGame}
          onCategories={() => setScreen("cats")}
        />
      )}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
// NOTE: When porting to React Native, convert these to StyleSheet.create({})
// and replace web-only properties (e.g. cursor, fontFamily strings) accordingly.

const styles = {
  screen: { paddingTop: "1rem" },
  centerColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "2.5rem",
    paddingBottom: "2rem",
  },
  tagline: {
    fontSize: 15,
    color: "#666",
    margin: "12px 0 8px",
    lineHeight: 1.5,
  },
  rulesRow: {
    display: "flex",
    gap: 20,
    marginBottom: "2rem",
    fontSize: 13,
    color: "#666",
  },
  badge: {
    display: "inline-block",
    background: "#fef3c7",
    color: "#92400e",
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 6,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  btnMain: {
    background: "#111",
    color: "#fff",
    fontFamily: "Impact, 'Arial Narrow', sans-serif",
    fontSize: 22,
    letterSpacing: 1.5,
    padding: "13px 48px",
    borderRadius: 8,
    cursor: "pointer",
    border: "none",
  },
  btnGhost: {
    background: "transparent",
    border: "1px solid #ccc",
    color: "#666",
    fontSize: 13,
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: 13,
    cursor: "pointer",
    padding: "0 0 1.25rem",
  },
  sectionTitle: { fontSize: 20, fontWeight: 500, marginBottom: 16 },
  catCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 12,
    border: "1px solid #e5e5e5",
    background: "#fff",
    marginBottom: 10,
  },
  catName: {
    fontFamily: "Impact, 'Arial Narrow', sans-serif",
    fontSize: 32,
    letterSpacing: 0.5,
  },
  catSport: { fontSize: 12, color: "#888", marginTop: 3 },
  tag: { fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6 },
  gameHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  lbl: {
    fontSize: 11,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 2,
  },
  timerText: {
    fontFamily: "Impact, 'Arial Narrow', sans-serif",
    fontSize: 52,
    lineHeight: 1,
  },
  scoreText: {
    fontFamily: "Impact, 'Arial Narrow', sans-serif",
    fontSize: 38,
    lineHeight: 1,
  },
  progressTrack: {
    height: 3,
    background: "#e5e5e5",
    borderRadius: 2,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#111",
    transition: "width 0.5s linear",
  },
  findLbl: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#888",
    textAlign: "center",
    marginBottom: 14,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 10,
  },
  card: {
    borderRadius: 12,
    padding: "18px 12px",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.3,
    minHeight: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  skipBtn: {
    width: "100%",
    background: "transparent",
    border: "1px solid #e5e5e5",
    color: "#888",
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    cursor: "pointer",
  },
  explanation: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
    minHeight: 18,
    lineHeight: 1.4,
  },
  verdict: {
    fontFamily: "Impact, 'Arial Narrow', sans-serif",
    fontSize: 20,
    letterSpacing: 1,
    color: "#888",
    marginBottom: 6,
  },
  bigScore: {
    fontFamily: "Impact, 'Arial Narrow', sans-serif",
    fontSize: 96,
    lineHeight: 1,
    color: "#111",
  },
  endLbl: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "2rem",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    padding: "9px 0",
    borderTop: "1px solid #f0f0f0",
    color: "#888",
  },
  endBtns: { display: "flex", gap: 10, marginTop: "1.5rem" },
};
