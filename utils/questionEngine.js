import NBA_PLAYERS from '../data/nba_players.json';
import MLB_PLAYERS from '../data/mlb_players.json';
import NFL_PLAYERS from '../data/nfl_players.json';
import { generateGame as generateNBAGame } from './nbaQuestionEngine';
import { generateMLBGame } from './mlbQuestionEngine';
import { generateNFLGame } from './nflQuestionEngine';

export function generateGame(category) {
  if (category === 'mlb') return generateMLBGame(MLB_PLAYERS);
  if (category === 'nfl') return generateNFLGame(NFL_PLAYERS);
  return generateNBAGame(NBA_PLAYERS);
}
