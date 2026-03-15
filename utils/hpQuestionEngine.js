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

export const HP_TEMPLATES = [

  // 1. Gryffindors (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.house === "Gryffindor");
    const one = pick(chars.filter((c) => c.house !== "Gryffindor"), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a Gryffindor (${i.house}). The other three are Gryffindors.`,
    };
  },

  // 2. Slytherins (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.house === "Slytherin");
    const one = pick(chars.filter((c) => c.house !== "Slytherin"), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a Slytherin (${i.house}). The other three are Slytherins.`,
    };
  },

  // 3. Death Eaters (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.death_eater);
    const one = pick(chars.filter((c) => !c.death_eater), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} was never a Death Eater. The other three served Voldemort.`,
    };
  },

  // 4. Order of the Phoenix members (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.order_member);
    const one = pick(chars.filter((c) => !c.order_member), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} was not a member of the Order of the Phoenix. The other three were.`,
    };
  },

  // 5. Dumbledore's Army members (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.dumbledores_army);
    const one = pick(chars.filter((c) => !c.dumbledores_army), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} was not in Dumbledore's Army. The other three were members.`,
    };
  },

  // 6. Weasley family (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.weasley);
    const one = pick(chars.filter((c) => !c.weasley), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a Weasley. The other three are members of the Weasley family.`,
    };
  },

  // 7. Villains (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.villain);
    const one = pick(chars.filter((c) => !c.villain), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a villain. The other three are antagonists in the series.`,
    };
  },

  // 8. Deceased characters (imposter is alive)
  (chars) => {
    const three = chars.filter((c) => c.deceased && c.human);
    const one = pick(chars.filter((c) => !c.deceased && c.human), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is still alive. The other three died during the series.`,
    };
  },

  // 9. Animagi (imposter cannot transform)
  (chars) => {
    const three = chars.filter((c) => c.animagus);
    const one = pick(chars.filter((c) => !c.animagus && c.human), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not an Animagus. The other three can transform into animals at will.`,
    };
  },

  // 10. Marauders (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.marauder);
    const one = pick(chars.filter((c) => !c.marauder), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} was not one of the Marauders. The four Marauders were Moony, Wormtail, Padfoot, and Prongs.`,
    };
  },

  // 11. Horcruxes — characters who were one (imposter was not)
  (chars) => {
    const three = chars.filter((c) => c.horcrux);
    const one = pick(chars.filter((c) => !c.horcrux), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} was not a Horcrux. The other three contained a piece of Voldemort's soul.`,
    };
  },

  // 12. Hogwarts staff (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.hogwarts_staff);
    const one = pick(chars.filter((c) => !c.hogwarts_staff), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} was never a Hogwarts teacher or staff member. The other three were.`,
    };
  },

  // 13. Hogwarts students (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.hogwarts_student);
    const one = pick(chars.filter((c) => !c.hogwarts_student), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} was not a Hogwarts student during the series. The other three were.`,
    };
  },

  // 14. Non-human characters (imposter is human)
  (chars) => {
    const three = chars.filter((c) => !c.human);
    const one = pick(chars.filter((c) => c.human), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is human. The other three are non-human magical beings.`,
    };
  },

  // 15. Characters with a known Patronus (imposter does not have one)
  (chars) => {
    const three = chars.filter((c) => c.patronus);
    const one = pick(chars.filter((c) => !c.patronus && c.human), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} does not have a known Patronus. The other three do.`,
    };
  },

  // 16. Ministry of Magic employees (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.ministry);
    const one = pick(chars.filter((c) => !c.ministry), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} was never employed by the Ministry of Magic. The other three were.`,
    };
  },

  // 17. Quidditch players (imposter never played)
  (chars) => {
    const three = chars.filter((c) => c.quidditch_player);
    const one = pick(chars.filter((c) => !c.quidditch_player && c.human), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} never played Quidditch. The other three are known Quidditch players.`,
    };
  },

  // 18. Pure-blood wizards (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.blood_status === "Pure-blood" && c.human);
    const one = pick(
      chars.filter((c) => c.blood_status !== "Pure-blood" && c.human),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not Pure-blood (${i.blood_status}). The other three are Pure-blood wizards.`,
    };
  },

  // 19. Muggle-born wizards (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.blood_status === "Muggle-born");
    const one = pick(chars.filter((c) => c.blood_status !== "Muggle-born" && c.human), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not Muggle-born (${i.blood_status}). The other three are Muggle-born witches or wizards.`,
    };
  },

  // 20. Introduced in Book 1 (imposter is from a later book)
  (chars) => {
    const three = chars.filter((c) => c.book_introduced === 1);
    const one = pick(chars.filter((c) => c.book_introduced > 1), 1)[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} was introduced in Book ${i.book_introduced}, not Book 1. The other three appeared in The Philosopher's Stone.`,
    };
  },
];

export function generateHPGame(chars, count = 15) {
  const shuffledTemplates = shuf(HP_TEMPLATES);
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
        explanation: result.explanation(result.one),
      });
    } catch (e) {
      continue;
    }
  }

  return questions;
}
