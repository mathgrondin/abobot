import MatchRepository, { Match } from '../repository/matchRepository';
import SeasonWorkflow from './seasonWorkflow';
import { ApiError } from 'next/dist/server/api-utils';
import { getCurrentMatchId } from '../../helpers/getCurrentMatchId';
import { getSeasonIdFromMatchId } from '../../helpers/getSeasonIdFromMatchId';
import { validateNewMatch } from '../validator/matchValidator';
import VoteService from '../service/VoteService';
import MessengerService from '../service/messengerService';

const MatchWorkflowError_InvalidMatchId = () => new ApiError(404, 'Invalid match id');
const MatchWorkflowError_NoMatchAtTheMoment = () => new ApiError(405, 'Not match started at the moment. Please try again');
const MatchWorkflowError_SeasonNotFound = () => new ApiError(405, 'No season found, create a season first');

async function getMatch(matchId: number): Promise<Match | undefined> {
  const seasonId = getSeasonIdFromMatchId(matchId);
  if (seasonId == null) {
    throw MatchWorkflowError_InvalidMatchId();
  }

  const match = await MatchRepository.getMatch(`${matchId}`);
  return match;
}

async function createMatch(teamIds: string[]): Promise<Match> {
  const matchId = getCurrentMatchId();
  const seasonId = getSeasonIdFromMatchId(matchId);
  const season = await SeasonWorkflow.getSeason(seasonId);
  if (season == undefined) {
    throw MatchWorkflowError_SeasonNotFound();
  }
  validateNewMatch(matchId, teamIds, season);
  season.matchIds.push(`${matchId}`);
  await SeasonWorkflow.updateSeason(season);
  const match = await MatchRepository.createMatch(`${matchId}`, teamIds);
  return match;
}

async function addMessage(userId: string, message: string) {
  const currentMatchId = getCurrentMatchId();
  const currentMatch = await getMatch(currentMatchId);
  console.log('currentMatch', currentMatch.id);
  if (currentMatch == null) {
    return;
  }

  const [reply, playerId] = await VoteService.onNewMessage(currentMatch, userId, message);
  console.log('playerId', playerId);
  if (playerId) {
    if (!currentMatch.messages[userId]) {
      currentMatch.messages[userId] = [];
    }
    currentMatch.messages[userId].push(playerId);
    await updateMatch(currentMatch);
  }
  await MessengerService.sendMessage(userId, reply);
}

const updateMatch = (match: Match): Promise<Match> => {
  return MatchRepository.updateMatch(match);
};

const deleteMatch = (): Promise<Match | undefined> => {
  return undefined;
};

// TODO
// export function deleteMatch()

const MatchWorkflow = {
  getMatch,
  createMatch,
  addMessage,
  updateMatch,
  deleteMatch
};

export default MatchWorkflow;