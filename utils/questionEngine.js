import NBA_PLAYERS from '../data/nba_players.json';
import MLB_PLAYERS from '../data/mlb_players.json';
import { generateGame as generateNBAGame } from './nbaQuestionEngine';
import { generateMLBGame } from './mlbQuestionEngine';

export function generateGame(category) {
  if (category === 'mlb') return generateMLBGame(MLB_PLAYERS);
  return generateNBAGame(NBA_PLAYERS);
}
