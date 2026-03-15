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

  // 1. Gryffindor (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.house === "Gryffindor");
    const one = pick(chars.filter((c) => c.house !== "Gryffindor"), 1)[0];
    return {
      three, one,
      prompt: "Three are Gryffindors. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a Gryffindor — they are ${i.house ?? "unhoused"}. The other three are in Gryffindor.`,
    };
  },

  // 2. Slytherin (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.house === "Slytherin");
    const one = pick(chars.filter((c) => c.house !== "Slytherin"), 1)[0];
    return {
      three, one,
      prompt: "Three are Slytherins. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a Slytherin — they are ${i.house ?? "unhoused"}. The other three are in Slytherin.`,
    };
  },

  // 3. Hufflepuff (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.house === "Hufflepuff");
    const one = pick(chars.filter((c) => c.house !== "Hufflepuff"), 1)[0];
    return {
      three, one,
      prompt: "Three are Hufflepuffs. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a Hufflepuff — they are ${i.house ?? "unhoused"}. The other three are in Hufflepuff.`,
    };
  },

  // 4. Death Eaters (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.death_eater);
    const one = pick(chars.filter((c) => !c.death_eater), 1)[0];
    return {
      three, one,
      prompt: "Three are Death Eaters. Who isn't?",
      explanation: (i) =>
        `${i.name} was never a Death Eater. The other three served Voldemort.`,
    };
  },

  // 5. Not Death Eaters (imposter is one)
  (chars) => {
    const three = chars.filter((c) => !c.death_eater);
    const one = pick(chars.filter((c) => c.death_eater), 1)[0];
    return {
      three, one,
      prompt: "Three are not Death Eaters. Who is?",
      explanation: (i) =>
        `${i.name} is a Death Eater who served Voldemort. The other three are not.`,
    };
  },

  // 6. Order of the Phoenix (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.order_member);
    const one = pick(chars.filter((c) => !c.order_member), 1)[0];
    return {
      three, one,
      prompt: "Three are Order of the Phoenix members. Who isn't?",
      explanation: (i) =>
        `${i.name} was never a member of the Order of the Phoenix. The other three were.`,
    };
  },

  // 7. Dumbledore's Army (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.dumbledores_army);
    const one = pick(chars.filter((c) => !c.dumbledores_army), 1)[0];
    return {
      three, one,
      prompt: "Three were in Dumbledore's Army. Who wasn't?",
      explanation: (i) =>
        `${i.name} was not a member of Dumbledore's Army. The other three were.`,
    };
  },

  // 8. Hogwarts students (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.hogwarts_student);
    const one = pick(chars.filter((c) => !c.hogwarts_student), 1)[0];
    return {
      three, one,
      prompt: "Three attended Hogwarts as students. Who didn't?",
      explanation: (i) =>
        `${i.name} was not a Hogwarts student. The other three attended the school.`,
    };
  },

  // 9. Hogwarts staff (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.hogwarts_staff);
    const one = pick(chars.filter((c) => !c.hogwarts_staff), 1)[0];
    return {
      three, one,
      prompt: "Three were Hogwarts staff. Who wasn't?",
      explanation: (i) =>
        `${i.name} was never on the Hogwarts staff. The other three were teachers or staff.`,
    };
  },

  // 10. Villains (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.villain);
    const one = pick(chars.filter((c) => !c.villain), 1)[0];
    return {
      three, one,
      prompt: "Three are villains. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a villain. The other three are antagonists in the series.`,
    };
  },

  // 11. Heroes (imposter is a villain)
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

  // 12. Deceased (imposter survived)
  (chars) => {
    const three = chars.filter((c) => c.deceased);
    const one = pick(chars.filter((c) => !c.deceased), 1)[0];
    return {
      three, one,
      prompt: "Three died in the series. Who survived?",
      explanation: (i) =>
        `${i.name} survived the series. The other three did not make it.`,
    };
  },

  // 13. Survivors (imposter died)
  (chars) => {
    const three = chars.filter((c) => !c.deceased);
    const one = pick(chars.filter((c) => c.deceased), 1)[0];
    return {
      three, one,
      prompt: "Three survived the series. Who didn't?",
      explanation: (i) =>
        `${i.name} died during the series. The other three survived.`,
    };
  },

  // 14. Animagus (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.animagus);
    const one = pick(chars.filter((c) => !c.animagus), 1)[0];
    return {
      three, one,
      prompt: "Three are Animagi. Who isn't?",
      explanation: (i) =>
        `${i.name} is not an Animagus. The other three can transform into animals at will.`,
    };
  },

  // 15. Can cast a Patronus (imposter cannot)
  (chars) => {
    const three = chars.filter((c) => c.patronus);
    const one = pick(chars.filter((c) => !c.patronus), 1)[0];
    return {
      three, one,
      prompt: "Three can cast a Patronus. Who can't?",
      explanation: (i) =>
        `${i.name} cannot cast a Patronus charm. The other three can.`,
    };
  },

  // 16. Connected to a Horcrux (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.horcrux);
    const one = pick(chars.filter((c) => !c.horcrux), 1)[0];
    return {
      three, one,
      prompt: "Three are connected to a Horcrux. Who isn't?",
      explanation: (i) =>
        `${i.name} has no connection to a Horcrux. The other three do.`,
    };
  },

  // 17. Weasley family (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.weasley);
    const one = pick(chars.filter((c) => !c.weasley), 1)[0];
    return {
      three, one,
      prompt: "Three are Weasleys. Who isn't?",
      explanation: (i) =>
        `${i.name} is not a Weasley. The other three are members of the Weasley family.`,
    };
  },

  // 18. Pure-blood (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.blood_status === "Pure-blood");
    const one = pick(chars.filter((c) => c.blood_status !== "Pure-blood"), 1)[0];
    return {
      three, one,
      prompt: "Three are Pure-blood wizards. Who isn't?",
      explanation: (i) =>
        `${i.name} is ${i.blood_status}, not Pure-blood. The other three are Pure-blood wizards.`,
    };
  },

  // 19. Muggle-born (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.blood_status === "Muggle-born");
    const one = pick(chars.filter((c) => c.blood_status !== "Muggle-born"), 1)[0];
    return {
      three, one,
      prompt: "Three are Muggle-born. Who isn't?",
      explanation: (i) =>
        `${i.name} is ${i.blood_status}, not Muggle-born. The other three are Muggle-born witches or wizards.`,
    };
  },

  // 20. Marauders (imposter is not)
  (chars) => {
    const three = chars.filter((c) => c.marauder);
    const one = pick(chars.filter((c) => !c.marauder), 1)[0];
    return {
      three, one,
      prompt: "Three are Marauders. Who isn't?",
      explanation: (i) =>
        `${i.name} was not one of the Marauders. The other three were part of the original group.`,
    };
  },
];

export function generateHarryPotterGame(chars, count = 15) {
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
        prompt: result.prompt,
        explanation: result.explanation(result.one),
      });
    } catch (e) {
      continue;
    }
  }

  return questions;
}
