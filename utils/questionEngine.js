import NBA_PLAYERS from '../data/nba_players.json';
import MLB_PLAYERS from '../data/mlb_players.json';
import NFL_PLAYERS from '../data/nfl_players.json';
import POKEMON from '../data/pokemon.json';
import MCU_CHARACTERS from '../data/mcu_characters.json';
import { generateGame as generateNBAGame } from './nbaQuestionEngine';
import { generateMLBGame } from './mlbQuestionEngine';
import { generateNFLGame } from './nflQuestionEngine';
import { generatePokemonGame } from './pokemonQuestionEngine';
import { generateMCUGame } from './mcuQuestionEngine';
import HP_CHARACTERS from '../data/harry_potter.json';
import { generateHarryPotterGame } from './harryPotterQuestionEngine';
import SMASH_FIGHTERS from '../data/smash_ultimate.json';
import { generateSmashGame } from './smashQuestionEngine';

export function generateGame(category) {
  if (category === 'mlb')     return generateMLBGame(MLB_PLAYERS);
  if (category === 'nfl')     return generateNFLGame(NFL_PLAYERS);
  if (category === 'pokemon') return generatePokemonGame(POKEMON);
  if (category === 'mcu')     return generateMCUGame(MCU_CHARACTERS);
  if (category === 'hp')      return generateHarryPotterGame(HP_CHARACTERS);
  if (category === 'smash')   return generateSmashGame(SMASH_FIGHTERS);
  return generateNBAGame(NBA_PLAYERS);
}
