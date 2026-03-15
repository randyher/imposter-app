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

export const SMASH_TEMPLATES = [

  // 1. DLC fighters (imposter is base roster)
  (fighters) => {
    const three = fighters.filter((f) => f.dlc);
    const one = pick(fighters.filter((f) => !f.dlc), 1)[0];
    return {
      three, one,
      prompt: "Three are DLC fighters. Who isn't?",
      explanation: (i) =>
        `${i.name} was part of the base roster, not DLC. The other three were paid DLC fighters.`,
    };
  },

  // 2. Base roster (imposter is DLC)
  (fighters) => {
    const three = fighters.filter((f) => !f.dlc && !f.echo_fighter);
    const one = pick(fighters.filter((f) => f.dlc), 1)[0];
    return {
      three, one,
      prompt: "Three are base roster fighters. Who's DLC?",
      explanation: (i) =>
        `${i.name} was a DLC fighter. The other three were in the base roster.`,
    };
  },

  // 3. Echo fighters (imposter is not)
  (fighters) => {
    const three = fighters.filter((f) => f.echo_fighter);
    const one = pick(fighters.filter((f) => !f.echo_fighter), 1)[0];
    return {
      three, one,
      prompt: "Three are echo fighters. Who isn't?",
      explanation: (i) =>
        `${i.name} is not an echo fighter. The other three are echoes — clones of existing fighters.`,
    };
  },

  // 4. Third-party fighters (imposter is Nintendo)
  (fighters) => {
    const three = fighters.filter((f) => !f.nintendo_first_party);
    const one = pick(fighters.filter((f) => f.nintendo_first_party), 1)[0];
    return {
      three, one,
      prompt: "Three are third-party guest fighters. Who's Nintendo?",
      explanation: (i) =>
        `${i.name} is a Nintendo first-party character. The other three are third-party guests.`,
    };
  },

  // 5. Nintendo first-party (imposter is third-party)
  (fighters) => {
    const three = fighters.filter((f) => f.nintendo_first_party && !f.echo_fighter);
    const one = pick(fighters.filter((f) => !f.nintendo_first_party), 1)[0];
    return {
      three, one,
      prompt: "Three are Nintendo characters. Who's the guest?",
      explanation: (i) =>
        `${i.name} is a third-party guest (${i.universe}). The other three are Nintendo characters.`,
    };
  },

  // 6. Villains (imposter is not)
  (fighters) => {
    const three = fighters.filter((f) => f.villain);
    const one = pick(fighters.filter((f) => !f.villain), 1)[0];
    return {
      three, one,
      prompt: "Three are villains. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a villain. The other three are antagonists in their home franchises.`,
    };
  },

  // 7. Fire Emblem universe (imposter is not)
  (fighters) => {
    const three = fighters.filter((f) => f.universe === "Fire Emblem");
    const one = pick(fighters.filter((f) => f.universe !== "Fire Emblem"), 1)[0];
    return {
      three, one,
      prompt: "Three are from Fire Emblem. Who isn't?",
      explanation: (i) =>
        `${i.name} is from ${i.universe}, not Fire Emblem. The other three are Fire Emblem fighters.`,
    };
  },

  // 8. Pokemon universe (imposter is not)
  (fighters) => {
    const three = fighters.filter((f) => f.universe === "Pokemon");
    const one = pick(fighters.filter((f) => f.universe !== "Pokemon"), 1)[0];
    return {
      three, one,
      prompt: "Three are from the Pokémon universe. Who isn't?",
      explanation: (i) =>
        `${i.name} is from ${i.universe}, not Pokemon. The other three are Pokemon fighters.`,
    };
  },

  // 9. Legend of Zelda universe (imposter is not)
  (fighters) => {
    const three = fighters.filter((f) => f.universe === "The Legend of Zelda");
    const one = pick(fighters.filter((f) => f.universe !== "The Legend of Zelda"), 1)[0];
    return {
      three, one,
      prompt: "Three are from The Legend of Zelda. Who isn't?",
      explanation: (i) =>
        `${i.name} is from ${i.universe}. The other three are from The Legend of Zelda.`,
    };
  },

  // 10. Super Mario universe (imposter is not)
  (fighters) => {
    const three = fighters.filter((f) => f.universe === "Super Mario");
    const one = pick(fighters.filter((f) => f.universe !== "Super Mario"), 1)[0];
    return {
      three, one,
      prompt: "Three are from the Mario universe. Who isn't?",
      explanation: (i) =>
        `${i.name} is from ${i.universe}, not Super Mario. The other three are Mario universe fighters.`,
    };
  },

  // 11. Wields a weapon (imposter does not)
  (fighters) => {
    const three = fighters.filter((f) => f.wields_weapon);
    const one = pick(fighters.filter((f) => !f.wields_weapon), 1)[0];
    return {
      three, one,
      prompt: "Three wield a weapon. Who fights bare-handed?",
      explanation: (i) =>
        `${i.name} does not wield a weapon — they fight bare-handed or use their body. The other three wield weapons.`,
    };
  },

  // 12. No weapon (imposter wields one)
  (fighters) => {
    const three = fighters.filter((f) => !f.wields_weapon);
    const one = pick(fighters.filter((f) => f.wields_weapon), 1)[0];
    return {
      three, one,
      prompt: "Three fight without a weapon. Who wields one?",
      explanation: (i) =>
        `${i.name} wields a weapon. The other three fight without one.`,
    };
  },

  // 13. Has a projectile (imposter does not)
  (fighters) => {
    const three = fighters.filter((f) => f.has_projectile);
    const one = pick(fighters.filter((f) => !f.has_projectile), 1)[0];
    return {
      three, one,
      prompt: "Three have a projectile move. Who doesn't?",
      explanation: (i) =>
        `${i.name} has no projectile move. The other three can attack from a distance.`,
    };
  },

  // 14. Original SSB64 veterans (imposter is not)
  (fighters) => {
    const three = fighters.filter((f) => f.first_smash_game === "SSB64");
    const one = pick(fighters.filter((f) => f.first_smash_game !== "SSB64"), 1)[0];
    return {
      three, one,
      prompt: "Three were in the original Smash 64. Who wasn't?",
      explanation: (i) =>
        `${i.name} was not in the original Super Smash Bros on N64 (debuted in ${i.first_smash_game}). The other three are SSB64 originals.`,
    };
  },

  // 15. Melee newcomers (imposter is not)
  (fighters) => {
    const three = fighters.filter((f) => f.first_smash_game === "Melee");
    const one = pick(fighters.filter((f) => f.first_smash_game !== "Melee"), 1)[0];
    return {
      three, one,
      prompt: "Three debuted in Melee. Who didn't?",
      explanation: (i) =>
        `${i.name} did not debut in Melee (first appeared in ${i.first_smash_game}). The other three were Melee newcomers.`,
    };
  },

  // 16. Ultimate newcomers (imposter appeared in earlier game)
  (fighters) => {
    const three = fighters.filter((f) => f.first_smash_game === "Ultimate" && !f.echo_fighter && !f.dlc);
    const one = pick(fighters.filter((f) => f.first_smash_game !== "Ultimate"), 1)[0];
    return {
      three, one,
      prompt: "Three are new to Smash in Ultimate. Who isn't?",
      explanation: (i) =>
        `${i.name} appeared before Ultimate (debuted in ${i.first_smash_game}). The other three are new to Smash in Ultimate.`,
    };
  },

  // 17. Animal / creature species (imposter is human)
  (fighters) => {
    const three = fighters.filter((f) => f.species === "Animal" || f.species === "Pokemon");
    const one = pick(fighters.filter((f) => f.species === "Human"), 1)[0];
    return {
      three, one,
      prompt: "Three are animals or creatures. Who's human?",
      explanation: (i) =>
        `${i.name} is human. The other three are animal or Pokemon fighters.`,
    };
  },

  // 18. Robot / mechanical fighters (imposter is not)
  (fighters) => {
    const three = fighters.filter((f) => f.species === "Robot");
    const one = pick(fighters.filter((f) => f.species !== "Robot"), 1)[0];
    return {
      three, one,
      prompt: "Three are robots or mechanical fighters. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a robot (${i.species}). The other three are mechanical fighters.`,
    };
  },

  // 19. Debuted in the 1980s (imposter is from a later decade)
  (fighters) => {
    const three = fighters.filter((f) => f.debut_decade === 1980);
    const one = pick(fighters.filter((f) => f.debut_decade !== 1980), 1)[0];
    return {
      three, one,
      prompt: "Three are from franchises that started in the 1980s. Who isn't?",
      explanation: (i) =>
        `${i.name}'s franchise debuted in the ${i.debut_decade}s. The other three are from franchises that started in the 1980s.`,
    };
  },

  // 20. Debuted in the 2010s (imposter is from an earlier decade)
  (fighters) => {
    const three = fighters.filter((f) => f.debut_decade === 2010);
    const one = pick(fighters.filter((f) => f.debut_decade !== 2010), 1)[0];
    return {
      three, one,
      prompt: "Three are from franchises that started in the 2010s. Who isn't?",
      explanation: (i) =>
        `${i.name}'s franchise debuted before the 2010s (${i.debut_decade}s). The other three are from franchises that started in the 2010s.`,
    };
  },
];

export function generateSmashGame(fighters, count = 15) {
  const shuffledTemplates = shuf(SMASH_TEMPLATES);
  const questions = [];

  for (const template of shuffledTemplates) {
    if (questions.length >= count) break;
    try {
      const result = template(fighters);
      if (!result || !result.three || result.three.length < 3 || !result.one)
        continue;
      const opts = shuf([...pick(result.three, 3), result.one]);
      questions.push({
        opts: opts.map((f) => f.name),
        ans: opts.findIndex((f) => f.name === result.one.name),
        prompt: result.prompt,
        explanation: result.explanation(result.one),
      });
    } catch (e) {
      continue;
    }
  }

  return questions;
}
