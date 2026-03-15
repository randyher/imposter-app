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

export const TEMPLATES = [
  // 1. Eastern Conference (imposter is Western)
  (players) => {
    const three = players.filter((p) => p.conference === "Eastern");
    const one = pick(players.filter((p) => p.conference === "Western"), 1)[0];
    return {
      three, one,
      prompt: "Three play in the Eastern Conference. Who doesn't?",
      explanation: (i) =>
        `${i.name} plays in the Western Conference. The other three are Eastern.`,
    };
  },

  // 2. Western Conference (imposter is Eastern)
  (players) => {
    const three = players.filter((p) => p.conference === "Western");
    const one = pick(players.filter((p) => p.conference === "Eastern"), 1)[0];
    return {
      three, one,
      prompt: "Three play in the Western Conference. Who doesn't?",
      explanation: (i) =>
        `${i.name} plays in the Eastern Conference. The other three are Western.`,
    };
  },

  // 3. Champions (imposter never won)
  (players) => {
    const three = players.filter((p) => p.champion);
    const one = pick(players.filter((p) => !p.champion), 1)[0];
    return {
      three, one,
      prompt: "Three are NBA Champions. Who isn't?",
      explanation: (i) =>
        `${i.name} has never won an NBA Championship. The other three have rings.`,
    };
  },

  // 4. Never won a ring (imposter has one)
  (players) => {
    const three = players.filter((p) => !p.champion);
    const one = pick(players.filter((p) => p.champion), 1)[0];
    return {
      three, one,
      prompt: "Three never won a championship. Who has a ring?",
      explanation: (i) =>
        `${i.name} is a champion (${i.championships} ring${
          i.championships > 1 ? "s" : ""
        }). The other three never won a title.`,
    };
  },

  // 5. MVP winners (imposter never won)
  (players) => {
    const three = players.filter((p) => p.mvp);
    const one = pick(players.filter((p) => !p.mvp), 1)[0];
    return {
      three, one,
      prompt: "Three have won MVP. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never won the MVP award. The other three have.`,
    };
  },

  // 6. DPOY winners (imposter never won)
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

  // 7. Rookie of the Year winners (imposter never won)
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

  // 8. Scoring title winners (imposter never won)
  (players) => {
    const three = players.filter((p) => p.scoring_title);
    const one = pick(players.filter((p) => !p.scoring_title), 1)[0];
    return {
      three, one,
      prompt: "Three have led the league in scoring. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never led the league in scoring. The other three have won a scoring title.`,
    };
  },

  // 9. #1 overall picks (imposter was not)
  (players) => {
    const three = players.filter((p) => p.draft_pick === 1);
    const one = pick(players.filter((p) => p.draft_pick !== 1), 1)[0];
    return {
      three, one,
      prompt: "Three were #1 overall picks. Who wasn't?",
      explanation: (i) =>
        `${i.name} was not a #1 overall pick (drafted ${i.draft_pick}${ord(
          i.draft_pick
        )}). The other three were all picked first overall.`,
    };
  },

  // 10. NOT #1 overall picks (imposter was #1)
  (players) => {
    const three = players.filter(
      (p) => p.draft_pick !== 1 && p.draft_pick <= 20
    );
    const one = pick(players.filter((p) => p.draft_pick === 1), 1)[0];
    return {
      three, one,
      prompt: "Three were not #1 overall picks. Who was?",
      explanation: (i) =>
        `${i.name} was the #1 overall pick. The other three were not.`,
    };
  },

  // 11. Point guards (imposter is not)
  (players) => {
    const three = players.filter((p) => p.position.includes("PG"));
    const one = pick(players.filter((p) => !p.position.includes("PG")), 1)[0];
    return {
      three, one,
      prompt: "Three are point guards. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a point guard (${i.position.join(
          "/"
        )}). The other three are PGs.`,
    };
  },

  // 12. Centers (imposter is not)
  (players) => {
    const three = players.filter((p) => p.position.includes("C"));
    const one = pick(players.filter((p) => !p.position.includes("C")), 1)[0];
    return {
      three, one,
      prompt: "Three are centers. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a center (${i.position.join(
          "/"
        )}). The other three play center.`,
    };
  },

  // 13. Small forwards (imposter is not)
  (players) => {
    const three = players.filter((p) => p.position.includes("SF"));
    const one = pick(players.filter((p) => !p.position.includes("SF")), 1)[0];
    return {
      three, one,
      prompt: "Three are small forwards. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a small forward (${i.position.join(
          "/"
        )}). The other three are SFs.`,
    };
  },

  // 14. Kentucky alums (imposter did not attend)
  (players) => {
    const three = players.filter((p) => p.college === "Kentucky");
    const one = pick(players.filter((p) => p.college !== "Kentucky"), 1)[0];
    const c = one.college || "no college";
    return {
      three, one,
      prompt: "Three went to Kentucky. Who didn't?",
      explanation: (i) =>
        `${i.name} did not attend Kentucky — they went to ${c}. The other three are Wildcats.`,
    };
  },

  // 15. Duke alums (imposter did not attend)
  (players) => {
    const three = players.filter((p) => p.college === "Duke");
    const one = pick(players.filter((p) => p.college !== "Duke"), 1)[0];
    const c = one.college || "no college";
    return {
      three, one,
      prompt: "Three went to Duke. Who didn't?",
      explanation: (i) =>
        `${i.name} did not attend Duke — they went to ${c}. The other three are Blue Devils.`,
    };
  },

  // 16. One-team players (imposter played for many)
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

  // 17. Multiple championships (imposter has 0 or 1)
  (players) => {
    const three = players.filter((p) => p.championships >= 2);
    const one = pick(players.filter((p) => p.championships <= 1), 1)[0];
    const r = one.championships === 0 ? "no rings" : "1 ring";
    return {
      three, one,
      prompt: "Three won multiple championships. Who didn't?",
      explanation: (i) =>
        `${i.name} has ${r}. The other three all won multiple championships.`,
    };
  },

  // 18. Went straight to pros / international (imposter went to college)
  (players) => {
    const three = players.filter((p) => p.college === null);
    const one = pick(players.filter((p) => p.college !== null), 1)[0];
    return {
      three, one,
      prompt: "Three never played college ball. Who did?",
      explanation: (i) =>
        `${i.name} went to ${i.college}. The other three never played college basketball.`,
    };
  },

  // 19. Top-5 picks (imposter was not in lottery)
  (players) => {
    const three = players.filter((p) => p.draft_pick <= 5);
    const one = pick(players.filter((p) => p.draft_pick > 14), 1)[0];
    return {
      three, one,
      prompt: "Three were top-5 draft picks. Who wasn't?",
      explanation: (i) =>
        `${i.name} was drafted ${i.draft_pick}${ord(
          i.draft_pick
        )} overall — outside the lottery. The other three were all top-5 picks.`,
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
        `${i.name} won both MVP and a championship. The other three won MVP but never got a ring.`,
    };
  },
];

export function generateGame(players, count = 15) {
  const shuffledTemplates = shuf(TEMPLATES);
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
