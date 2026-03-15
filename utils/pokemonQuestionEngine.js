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

export const POKEMON_TEMPLATES = [
  // 1. Generation 1 (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.generation === 1);
    const one = pick(
      pokemon.filter((p) => p.generation !== 1),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is from Generation ${i.generation} (${i.region}). The other three are original Gen 1 Kanto Pokemon.`,
    };
  },

  // 2. Not Generation 1 (imposter is Gen 1)
  (pokemon) => {
    const three = pokemon.filter((p) => p.generation !== 1);
    const one = pick(
      pokemon.filter((p) => p.generation === 1),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is a Generation 1 Pokemon from Kanto. The other three are from later generations.`,
    };
  },

  // 3. Legendary Pokemon (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.legendary);
    const one = pick(
      pokemon.filter((p) => !p.legendary),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a Legendary Pokemon. The other three are legendaries.`,
    };
  },

  // 4. Non-legendary (imposter is legendary)
  (pokemon) => {
    const three = pokemon.filter((p) => !p.legendary && !p.mythical);
    const one = pick(
      pokemon.filter((p) => p.legendary),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is a Legendary Pokemon. The other three are not legendaries.`,
    };
  },

  // 5. Starter Pokemon (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.starter && p.evolution_stage === 1);
    const one = pick(
      pokemon.filter((p) => !p.starter),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a starter Pokemon. The other three are first-stage starters.`,
    };
  },

  // 6. Fully evolved starters (imposter is not a starter)
  (pokemon) => {
    const three = pokemon.filter((p) => p.starter && p.fully_evolved);
    const one = pick(
      pokemon.filter((p) => !p.starter),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a starter Pokemon. The other three are fully evolved starters.`,
    };
  },

  // 7. Fire type (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.type.includes("Fire"));
    const one = pick(
      pokemon.filter((p) => !p.type.includes("Fire")),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a Fire type (${i.type.join(
          "/"
        )}). The other three are Fire types.`,
    };
  },

  // 8. Water type (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.type.includes("Water"));
    const one = pick(
      pokemon.filter((p) => !p.type.includes("Water")),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a Water type (${i.type.join(
          "/"
        )}). The other three are Water types.`,
    };
  },

  // 9. Dragon type (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.type.includes("Dragon"));
    const one = pick(
      pokemon.filter((p) => !p.type.includes("Dragon")),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a Dragon type (${i.type.join(
          "/"
        )}). The other three are Dragon types.`,
    };
  },

  // 10. Psychic type (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.type.includes("Psychic"));
    const one = pick(
      pokemon.filter((p) => !p.type.includes("Psychic")),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a Psychic type (${i.type.join(
          "/"
        )}). The other three are Psychic types.`,
    };
  },

  // 11. Fully evolved (imposter is not)
  (pokemon) => {
    const three = pokemon.filter(
      (p) => p.fully_evolved && !p.legendary && !p.mythical
    );
    const one = pick(
      pokemon.filter((p) => !p.fully_evolved),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not fully evolved (it's stage ${i.evolution_stage}). The other three are fully evolved.`,
    };
  },

  // 12. First evolution stage (imposter is not)
  (pokemon) => {
    const three = pokemon.filter(
      (p) => p.evolution_stage === 1 && !p.legendary && !p.mythical
    );
    const one = pick(
      pokemon.filter(
        (p) => p.evolution_stage > 1 && !p.legendary && !p.mythical
      ),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is evolution stage ${i.evolution_stage}, not a base form. The other three are first-stage Pokemon.`,
    };
  },

  // 13. Dual type (imposter is single type)
  (pokemon) => {
    const three = pokemon.filter((p) => !p.single_type);
    const one = pick(
      pokemon.filter((p) => p.single_type),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is a single-type Pokemon (${i.type[0]} only). The other three are dual types.`,
    };
  },

  // 14. Single type (imposter is dual type)
  (pokemon) => {
    const three = pokemon.filter((p) => p.single_type);
    const one = pick(
      pokemon.filter((p) => !p.single_type),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is a dual-type Pokemon (${i.type.join(
          "/"
        )}). The other three are single types.`,
    };
  },

  // 15. Pseudo-legendary (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.pseudo_legendary);
    const one = pick(
      pokemon.filter((p) => !p.pseudo_legendary && !p.legendary && !p.mythical),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a pseudo-legendary. The other three are pseudo-legendaries — the most powerful non-legendary Pokemon in their generation.`,
    };
  },

  // 16. Mythical Pokemon (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.mythical);
    const one = pick(
      pokemon.filter((p) => !p.mythical && !p.legendary),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a Mythical Pokemon. The other three are mythicals — event-exclusive Pokemon like Mew and Celebi.`,
    };
  },

  // 17. Kanto region (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.region === "Kanto");
    const one = pick(
      pokemon.filter((p) => p.region !== "Kanto"),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is from ${i.region}, not Kanto. The other three are Kanto Pokemon.`,
    };
  },

  // 18. Johto region (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.region === "Johto");
    const one = pick(
      pokemon.filter((p) => p.region !== "Johto"),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is from ${i.region}, not Johto. The other three are Johto Pokemon.`,
    };
  },

  // 19. Original 151 (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.original_151);
    const one = pick(
      pokemon.filter((p) => !p.original_151),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} (Gen ${i.generation}) is not one of the original 151. The other three are from the first Pokedex.`,
    };
  },

  // 20. Fossil Pokemon (imposter is not)
  (pokemon) => {
    const three = pokemon.filter((p) => p.fossil);
    const one = pick(
      pokemon.filter((p) => !p.fossil),
      1
    )[0];
    return {
      three,
      one,
      explanation: (i) =>
        `${i.name} is not a fossil Pokemon. The other three are revived from fossils.`,
    };
  },
];

export function generatePokemonGame(pokemon, count = 15) {
  const shuffledTemplates = shuf(POKEMON_TEMPLATES);
  const questions = [];

  for (const template of shuffledTemplates) {
    if (questions.length >= count) break;
    try {
      const result = template(pokemon);
      if (!result || !result.three || result.three.length < 3 || !result.one)
        continue;
      const opts = shuf([...pick(result.three, 3), result.one]);
      questions.push({
        opts: opts.map((p) => p.name),
        ans: opts.findIndex((p) => p.name === result.one.name),
        explanation: result.explanation(result.one),
      });
    } catch (e) {
      continue;
    }
  }

  return questions;
}
