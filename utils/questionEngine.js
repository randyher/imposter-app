import NBA_PLAYERS from '../data/nba_players.json';
import MLB_PLAYERS from '../data/mlb_players.json';
import NFL_PLAYERS from '../data/nfl_players.json';
import POKEMON from '../data/pokemon.json';
import { generateGame as generateNBAGame } from './nbaQuestionEngine';
import { generateMLBGame } from './mlbQuestionEngine';
import { generateNFLGame } from './nflQuestionEngine';
import { generatePokemonGame } from './pokemonQuestionEngine';

export function generateGame(category) {
  if (category === 'mlb')     return generateMLBGame(MLB_PLAYERS);
  if (category === 'nfl')     return generateNFLGame(NFL_PLAYERS);
  if (category === 'pokemon') return generatePokemonGame(POKEMON);
  return generateNBAGame(NBA_PLAYERS);
}
