function shuf(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function pick(arr, n) {
  return shuf(arr).slice(0, n);
}

function ord(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export const NFL_TEMPLATES = [

  // 1. AFC players (imposter is NFC)
  (players) => {
    const three = players.filter((p) => p.primary_conference === "AFC");
    const one = pick(players.filter((p) => p.primary_conference === "NFC"), 1)[0];
    return {
      three, one,
      prompt: "Three are AFC players. Who isn't?",
      explanation: (i) =>
        `${i.name} is an NFC player. The other three are AFC.`,
    };
  },

  // 2. NFC players (imposter is AFC)
  (players) => {
    const three = players.filter((p) => p.primary_conference === "NFC");
    const one = pick(players.filter((p) => p.primary_conference === "AFC"), 1)[0];
    return {
      three, one,
      prompt: "Three are NFC players. Who isn't?",
      explanation: (i) =>
        `${i.name} is an AFC player. The other three are NFC.`,
    };
  },

  // 3. Super Bowl champions (imposter never won)
  (players) => {
    const three = players.filter((p) => p.champion);
    const one = pick(players.filter((p) => !p.champion), 1)[0];
    return {
      three, one,
      prompt: "Three are Super Bowl champions. Who isn't?",
      explanation: (i) =>
        `${i.name} has never won a Super Bowl. The other three have rings.`,
    };
  },

  // 4. Never won a ring (imposter has one)
  (players) => {
    const three = players.filter((p) => !p.champion);
    const one = pick(players.filter((p) => p.champion), 1)[0];
    return {
      three, one,
      prompt: "Three never won a Super Bowl. Who has a ring?",
      explanation: (i) =>
        `${i.name} is a Super Bowl champion (${i.championships} ring${
          i.championships > 1 ? "s" : ""
        }). The other three never won a title.`,
    };
  },

  // 5. League MVP winners (imposter never won)
  (players) => {
    const three = players.filter((p) => p.mvp);
    const one = pick(players.filter((p) => !p.mvp), 1)[0];
    return {
      three, one,
      prompt: "Three have won NFL MVP. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never won the NFL MVP award. The other three have.`,
    };
  },

  // 6. Super Bowl MVP winners (imposter never won)
  (players) => {
    const three = players.filter((p) => p.super_bowl_mvp);
    const one = pick(players.filter((p) => !p.super_bowl_mvp), 1)[0];
    return {
      three, one,
      prompt: "Three have won Super Bowl MVP. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never won Super Bowl MVP. The other three have.`,
    };
  },

  // 7. Hall of Famers (imposter is not)
  (players) => {
    const three = players.filter((p) => p.hall_of_fame);
    const one = pick(players.filter((p) => !p.hall_of_fame), 1)[0];
    return {
      three, one,
      prompt: "Three are in the Hall of Fame. Who isn't?",
      explanation: (i) =>
        `${i.name} is not in the Pro Football Hall of Fame. The other three are enshrined in Canton.`,
    };
  },

  // 8. Not in Hall of Fame (imposter is)
  (players) => {
    const three = players.filter((p) => !p.hall_of_fame);
    const one = pick(players.filter((p) => p.hall_of_fame), 1)[0];
    return {
      three, one,
      prompt: "Three are not in the Hall of Fame. Who is?",
      explanation: (i) =>
        `${i.name} is in the Hall of Fame. The other three have not been inducted.`,
    };
  },

  // 9. Defensive Player of the Year (imposter never won)
  (players) => {
    const three = players.filter((p) => p.dpoy);
    const one = pick(players.filter((p) => !p.dpoy), 1)[0];
    return {
      three, one,
      prompt: "Three won Defensive Player of the Year. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never won Defensive Player of the Year. The other three have.`,
    };
  },

  // 10. Offensive players (imposter is defensive)
  (players) => {
    const three = players.filter((p) => p.offense);
    const one = pick(players.filter((p) => !p.offense), 1)[0];
    return {
      three, one,
      prompt: "Three play offense. Who's on defense?",
      explanation: (i) =>
        `${i.name} is a defensive player (${i.position.join("/")}). The other three play offense.`,
    };
  },

  // 11. Defensive players (imposter plays offense)
  (players) => {
    const three = players.filter((p) => !p.offense);
    const one = pick(players.filter((p) => p.offense), 1)[0];
    return {
      three, one,
      prompt: "Three play defense. Who plays offense?",
      explanation: (i) =>
        `${i.name} plays offense (${i.position.join("/")}). The other three are defensive players.`,
    };
  },

  // 12. Quarterbacks (imposter is not)
  (players) => {
    const three = players.filter((p) => p.quarterback);
    const one = pick(players.filter((p) => !p.quarterback), 1)[0];
    return {
      three, one,
      prompt: "Three are quarterbacks. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a quarterback (${i.position.join("/")}). The other three play QB.`,
    };
  },

  // 13. Non-quarterbacks (imposter is a QB)
  (players) => {
    const three = players.filter((p) => !p.quarterback);
    const one = pick(players.filter((p) => p.quarterback), 1)[0];
    return {
      three, one,
      prompt: "Three are not quarterbacks. Who is?",
      explanation: (i) =>
        `${i.name} is a quarterback. The other three do not play QB.`,
    };
  },

  // 14. Rushing title winners (imposter never led league)
  (players) => {
    const three = players.filter((p) => p.rushing_title);
    const one = pick(players.filter((p) => !p.rushing_title), 1)[0];
    return {
      three, one,
      prompt: "Three have led the NFL in rushing. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never led the NFL in rushing yards. The other three have won a rushing title.`,
    };
  },

  // 15. Receiving title winners (imposter never led league)
  (players) => {
    const three = players.filter((p) => p.receiving_title);
    const one = pick(players.filter((p) => !p.receiving_title), 1)[0];
    return {
      three, one,
      prompt: "Three have led the NFL in receiving. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never led the NFL in receiving yards. The other three have won a receiving title.`,
    };
  },

  // 16. Rookie of the Year winners (imposter never won)
  (players) => {
    const three = players.filter((p) => p.rookie_of_year);
    const one = pick(players.filter((p) => !p.rookie_of_year), 1)[0];
    return {
      three, one,
      prompt: "Three won Rookie of the Year. Who didn't?",
      explanation: (i) =>
        `${i.name} never won Rookie of the Year. The other three did.`,
    };
  },

  // 17. Alabama alums (imposter did not attend)
  (players) => {
    const three = players.filter((p) => p.college === "Alabama");
    const one = pick(players.filter((p) => p.college !== "Alabama"), 1)[0];
    const c = one.college || "no college";
    return {
      three, one,
      prompt: "Three went to Alabama. Who didn't?",
      explanation: (i) =>
        `${i.name} did not attend Alabama — they went to ${c}. The other three are Crimson Tide.`,
    };
  },

  // 18. One-team players (imposter played for many)
  (players) => {
    const three = players.filter((p) => p.teams.length === 1);
    const one = pick(players.filter((p) => p.teams.length > 3), 1)[0];
    return {
      three, one,
      prompt: "Three spent their career with one team. Who didn't?",
      explanation: (i) =>
        `${i.name} played for ${i.teams.length} different teams. The other three spent their entire career with one franchise.`,
    };
  },

  // 19. Multiple Super Bowl rings (imposter has 0 or 1)
  (players) => {
    const three = players.filter((p) => p.championships >= 2);
    const one = pick(players.filter((p) => p.championships <= 1), 1)[0];
    const r = one.championships === 0 ? "no rings" : "1 ring";
    return {
      three, one,
      prompt: "Three won multiple Super Bowls. Who didn't?",
      explanation: (i) =>
        `${i.name} has ${r}. The other three all won multiple Super Bowls.`,
    };
  },

  // 20. MVP but no ring (imposter won both)
  (players) => {
    const three = players.filter((p) => p.mvp && !p.champion);
    const one = pick(players.filter((p) => p.mvp && p.champion), 1)[0];
    return {
      three, one,
      prompt: "Three won MVP but never got a ring. Who's the exception?",
      explanation: (i) =>
        `${i.name} won both NFL MVP and a Super Bowl. The other three won MVP but never got a ring.`,
    };
  },
];

export function generateNFLGame(players, count = 15) {
  const shuffledTemplates = shuf(NFL_TEMPLATES);
  const questions = [];

  for (const template of shuffledTemplates) {
    if (questions.length >= count) break;
    try {
      const result = template(players);
      if (!result || !result.three || result.three.length < 3 || !result.one)
        continue;
      const opts = shuf([...pick(result.three, 3), result.one]);
      questions.push({
        opts: opts.map((p) => p.name),
        ans: opts.findIndex((p) => p.name === result.one.name),
        prompt: result.prompt,
        explanation: result.explanation(result.one),
      });
    } catch (e) {
      continue;
    }
  }

  return questions;
}
