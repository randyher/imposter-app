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

export const MLB_TEMPLATES = [

  // 1. American League (imposter is National)
  (players) => {
    const three = players.filter((p) => p.primary_league === "American");
    const one = pick(players.filter((p) => p.primary_league === "National"), 1)[0];
    return {
      three, one,
      prompt: "Three are American League players. Who isn't?",
      explanation: (i) =>
        `${i.name} is a National League player. The other three are American League.`,
    };
  },

  // 2. National League (imposter is American)
  (players) => {
    const three = players.filter((p) => p.primary_league === "National");
    const one = pick(players.filter((p) => p.primary_league === "American"), 1)[0];
    return {
      three, one,
      prompt: "Three are National League players. Who isn't?",
      explanation: (i) =>
        `${i.name} is an American League player. The other three are National League.`,
    };
  },

  // 3. World Series champions (imposter never won)
  (players) => {
    const three = players.filter((p) => p.champion);
    const one = pick(players.filter((p) => !p.champion), 1)[0];
    return {
      three, one,
      prompt: "Three are World Series champions. Who isn't?",
      explanation: (i) =>
        `${i.name} has never won a World Series. The other three have rings.`,
    };
  },

  // 4. Never won a ring (imposter has one)
  (players) => {
    const three = players.filter((p) => !p.champion);
    const one = pick(players.filter((p) => p.champion), 1)[0];
    return {
      three, one,
      prompt: "Three never won a World Series. Who has a ring?",
      explanation: (i) =>
        `${i.name} is a World Series champion (${i.championships} ring${
          i.championships > 1 ? "s" : ""
        }). The other three never won it all.`,
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
        `${i.name} has never won an MLB MVP award. The other three have.`,
    };
  },

  // 6. Cy Young winners (imposter never won)
  (players) => {
    const three = players.filter((p) => p.cy_young);
    const one = pick(players.filter((p) => !p.cy_young), 1)[0];
    return {
      three, one,
      prompt: "Three have won the Cy Young Award. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never won the Cy Young Award. The other three have.`,
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
        `${i.name} is not in the Baseball Hall of Fame. The other three are enshrined in Cooperstown.`,
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
        `${i.name} is a Hall of Famer. The other three have not been inducted.`,
    };
  },

  // 9. Gold Glove winners (imposter never won)
  (players) => {
    const three = players.filter((p) => p.gold_glove);
    const one = pick(players.filter((p) => !p.gold_glove), 1)[0];
    return {
      three, one,
      prompt: "Three have won a Gold Glove. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never won a Gold Glove Award. The other three have.`,
    };
  },

  // 10. Rookie of the Year winners (imposter never won)
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

  // 11. Batting title winners (imposter never won)
  (players) => {
    const three = players.filter((p) => p.batting_title);
    const one = pick(players.filter((p) => !p.batting_title), 1)[0];
    return {
      three, one,
      prompt: "Three have won a batting title. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never won a batting title. The other three have led the league in batting average.`,
    };
  },

  // 12. Pitchers (imposter is a position player)
  (players) => {
    const three = players.filter((p) => p.pitcher);
    const one = pick(players.filter((p) => !p.pitcher), 1)[0];
    return {
      three, one,
      prompt: "Three are pitchers. Who isn't?",
      explanation: (i) =>
        `${i.name} is a position player (${i.position.join("/")}). The other three are pitchers.`,
    };
  },

  // 13. Position players (imposter is a pitcher)
  (players) => {
    const three = players.filter((p) => !p.pitcher);
    const one = pick(players.filter((p) => p.pitcher), 1)[0];
    return {
      three, one,
      prompt: "Three are position players. Who's the pitcher?",
      explanation: (i) =>
        `${i.name} is a pitcher. The other three are position players.`,
    };
  },

  // 14. 300+ career home runs (imposter doesn't have)
  (players) => {
    const three = players.filter((p) => p.career_hr_300plus);
    const one = pick(players.filter((p) => !p.career_hr_300plus), 1)[0];
    return {
      three, one,
      prompt: "Three hit 300+ career home runs. Who didn't?",
      explanation: (i) =>
        `${i.name} did not hit 300 or more career home runs. The other three are in the 300 HR club.`,
    };
  },

  // 15. One-team players (imposter played for many)
  (players) => {
    const three = players.filter((p) => p.teams.length === 1);
    const one = pick(players.filter((p) => p.teams.length > 4), 1)[0];
    return {
      three, one,
      prompt: "Three spent their career with one team. Who didn't?",
      explanation: (i) =>
        `${i.name} played for ${i.teams.length} different teams. The other three spent their entire career with one organization.`,
    };
  },

  // 16. Catchers (imposter plays another position)
  (players) => {
    const three = players.filter((p) => p.position.includes("C") && !p.pitcher);
    const one = pick(
      players.filter((p) => !p.position.includes("C") && !p.pitcher),
      1
    )[0];
    return {
      three, one,
      prompt: "Three are catchers. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a catcher (${i.position.join("/")}). The other three play behind the plate.`,
    };
  },

  // 17. Shortstops (imposter plays another position)
  (players) => {
    const three = players.filter((p) => p.position.includes("SS"));
    const one = pick(players.filter((p) => !p.position.includes("SS")), 1)[0];
    return {
      three, one,
      prompt: "Three are shortstops. Who isn't?",
      explanation: (i) =>
        `${i.name} does not play shortstop (${i.position.join("/")}). The other three are shortstops.`,
    };
  },

  // 18. International players — no college (imposter went to college)
  (players) => {
    const three = players.filter((p) => p.college === null);
    const one = pick(players.filter((p) => p.college !== null), 1)[0];
    return {
      three, one,
      prompt: "Three never played college ball. Who did?",
      explanation: (i) =>
        `${i.name} played college baseball at ${i.college}. The other three came up internationally without playing college ball in the US.`,
    };
  },

  // 19. Multiple championships (imposter has 0 or 1)
  (players) => {
    const three = players.filter((p) => p.championships >= 2);
    const one = pick(players.filter((p) => p.championships <= 1), 1)[0];
    const r = one.championships === 0 ? "no rings" : "1 ring";
    return {
      three, one,
      prompt: "Three won multiple World Series titles. Who didn't?",
      explanation: (i) =>
        `${i.name} has ${r}. The other three all won multiple World Series titles.`,
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
        `${i.name} won both MVP and a World Series. The other three won MVP but never got a ring.`,
    };
  },
];

export function generateMLBGame(players, count = 15) {
  const shuffledTemplates = shuf(MLB_TEMPLATES);
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
