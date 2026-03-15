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

export const MCU_TEMPLATES = [

  // 1. Avengers members (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.avenger);
    const one = pick(chars.filter((c) => !c.avenger), 1)[0];
    return {
      three, one,
      prompt: "Three are Avengers. Who isn't?",
      explanation: (i) =>
        `${i.name} was never an official Avenger. The other three are members of the team.`,
    };
  },

  // 2. Villains (imposter is a hero)
  (chars) => {
    const three = chars.filter((c) => c.villain);
    const one = pick(chars.filter((c) => !c.villain), 1)[0];
    return {
      three, one,
      prompt: "Three are villains. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a villain. The other three are MCU antagonists.`,
    };
  },

  // 3. Heroes (imposter is a villain)
  (chars) => {
    const three = chars.filter((c) => !c.villain);
    const one = pick(chars.filter((c) => c.villain), 1)[0];
    return {
      three, one,
      prompt: "Three are heroes or allies. Who's the villain?",
      explanation: (i) =>
        `${i.name} is a villain. The other three are heroes or allies.`,
    };
  },

  // 4. Alien characters (imposter is human)
  (chars) => {
    const three = chars.filter((c) => c.alien);
    const one = pick(chars.filter((c) => c.human), 1)[0];
    return {
      three, one,
      prompt: "Three are aliens. Who's human?",
      explanation: (i) =>
        `${i.name} is human, born on Earth. The other three are aliens.`,
    };
  },

  // 5. Human characters (imposter is alien)
  (chars) => {
    const three = chars.filter((c) => c.human);
    const one = pick(chars.filter((c) => c.alien), 1)[0];
    return {
      three, one,
      prompt: "Three are human. Who isn't?",
      explanation: (i) =>
        `${i.name} is not human — they are from ${i.origin}. The other three are human.`,
    };
  },

  // 6. Deceased characters (imposter is alive)
  (chars) => {
    const three = chars.filter((c) => c.deceased);
    const one = pick(chars.filter((c) => !c.deceased), 1)[0];
    return {
      three, one,
      prompt: "Three have died in the MCU. Who's still alive?",
      explanation: (i) =>
        `${i.name} is still alive in the MCU. The other three have died.`,
    };
  },

  // 7. Survived the snap (imposter was snapped)
  (chars) => {
    const three = chars.filter((c) => !c.snapped_away && !c.deceased);
    const one = pick(chars.filter((c) => c.snapped_away), 1)[0];
    return {
      three, one,
      prompt: "Three survived Thanos's snap. Who was dusted?",
      explanation: (i) =>
        `${i.name} was dusted by Thanos's snap. The other three survived it.`,
    };
  },

  // 8. Were snapped (imposter was not)
  (chars) => {
    const three = chars.filter((c) => c.snapped_away);
    const one = pick(chars.filter((c) => !c.snapped_away && !c.deceased), 1)[0];
    return {
      three, one,
      prompt: "Three were snapped by Thanos. Who wasn't?",
      explanation: (i) =>
        `${i.name} was not snapped by Thanos. The other three turned to dust.`,
    };
  },

  // 9. Has a solo film (imposter does not)
  (chars) => {
    const three = chars.filter((c) => c.has_solo_film);
    const one = pick(chars.filter((c) => !c.has_solo_film), 1)[0];
    return {
      three, one,
      prompt: "Three have a solo MCU film. Who doesn't?",
      explanation: (i) =>
        `${i.name} has never led their own solo MCU film. The other three have.`,
    };
  },

  // 10. Guardians of the Galaxy (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.guardian);
    const one = pick(chars.filter((c) => !c.guardian), 1)[0];
    return {
      three, one,
      prompt: "Three are Guardians of the Galaxy. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a Guardian of the Galaxy. The other three are.`,
    };
  },

  // 11. Royals (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.royal);
    const one = pick(chars.filter((c) => !c.royal), 1)[0];
    return {
      three, one,
      prompt: "Three are MCU royalty. Who isn't?",
      explanation: (i) =>
        `${i.name} is not royalty. The other three are kings, queens, or princes in the MCU.`,
    };
  },

  // 12. Infinity Stone wielders (imposter never wielded)
  (chars) => {
    const three = chars.filter((c) => c.infinity_stone_wielder);
    const one = pick(chars.filter((c) => !c.infinity_stone_wielder), 1)[0];
    return {
      three, one,
      prompt: "Three have wielded an Infinity Stone. Who hasn't?",
      explanation: (i) =>
        `${i.name} has never wielded an Infinity Stone. The other three have.`,
    };
  },

  // 13. S.H.I.E.L.D. members (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.shield_member);
    const one = pick(chars.filter((c) => !c.shield_member), 1)[0];
    return {
      three, one,
      prompt: "Three were S.H.I.E.L.D. members. Who wasn't?",
      explanation: (i) =>
        `${i.name} was never a S.H.I.E.L.D. member. The other three were agents or leaders.`,
    };
  },

  // 14. Phase 1 characters (imposter is from a later phase)
  (chars) => {
    const three = chars.filter((c) => c.phase_introduced === 1);
    const one = pick(chars.filter((c) => c.phase_introduced > 1), 1)[0];
    return {
      three, one,
      prompt: "Three debuted in Phase 1. Who didn't?",
      explanation: (i) =>
        `${i.name} was introduced in Phase ${i.phase_introduced}. The other three debuted in Phase 1.`,
    };
  },

  // 15. Phase 4 characters (imposter is from an earlier phase)
  (chars) => {
    const three = chars.filter((c) => c.phase_introduced === 4);
    const one = pick(chars.filter((c) => c.phase_introduced < 4), 1)[0];
    return {
      three, one,
      prompt: "Three debuted in Phase 4. Who didn't?",
      explanation: (i) =>
        `${i.name} was introduced in Phase ${i.phase_introduced}, not Phase 4. The other three are Phase 4 debuts.`,
    };
  },

  // 16. Androids / synthetics (imposter is organic)
  (chars) => {
    const three = chars.filter((c) => c.android);
    const one = pick(chars.filter((c) => !c.android), 1)[0];
    return {
      three, one,
      prompt: "Three are androids or synthetics. Who isn't?",
      explanation: (i) =>
        `${i.name} is not an android or synthetic being. The other three are.`,
    };
  },

  // 17. Eternals members (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.team && c.team.includes("Eternals"));
    const one = pick(chars.filter((c) => !c.team || !c.team.includes("Eternals")), 1)[0];
    return {
      three, one,
      prompt: "Three are Eternals. Who isn't?",
      explanation: (i) =>
        `${i.name} is not an Eternal. The other three are members of the Eternals.`,
    };
  },

  // 18. Asgardians (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.origin === "Asgard");
    const one = pick(chars.filter((c) => c.origin !== "Asgard"), 1)[0];
    return {
      three, one,
      prompt: "Three are from Asgard. Who isn't?",
      explanation: (i) =>
        `${i.name} is from ${i.origin}, not Asgard. The other three are Asgardians.`,
    };
  },

  // 19. Black Order members (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.team && c.team.includes("Black Order"));
    const one = pick(chars.filter((c) => !c.team || !c.team.includes("Black Order")), 1)[0];
    return {
      three, one,
      prompt: "Three are in Thanos's Black Order. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a member of Thanos's Black Order. The other three are.`,
    };
  },

  // 20. Introduced Phase 1-2, still alive in Phase 4
  (chars) => {
    const three = chars.filter((c) => c.phase_introduced <= 2 && !c.deceased);
    const one = pick(chars.filter((c) => c.phase_introduced <= 2 && c.deceased), 1)[0];
    return {
      three, one,
      prompt: "Three debuted early and survived to Phase 4. Who didn't make it?",
      explanation: (i) =>
        `${i.name} was introduced early but did not survive to Phase 4. The other three debuted in Phases 1-2 and are still alive.`,
    };
  },
];

export function generateMCUGame(chars, count = 15) {
  const shuffledTemplates = shuf(MCU_TEMPLATES);
  const questions = [];

  for (const template of shuffledTemplates) {
    if (questions.length >= count) break;
    try {
      const result = template(chars);
      if (!result || !result.three || result.three.length < 3 || !result.one)
        continue;
      const opts = shuf([...pick(result.three, 3), result.one]);
      questions.push({
        opts: opts.map((c) => c.name),
        ans: opts.findIndex((c) => c.name === result.one.name),
        prompt: result.prompt,
        explanation: result.explanation(result.one),
      });
    } catch (e) {
      continue;
    }
  }

  return questions;
}
