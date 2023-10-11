import MatchRepository, { Match } from '../repository/matchRepository';
import SeasonWorkflow from './seasonWorkflow';
import { ApiError } from 'next/dist/server/api-utils';
import { getCurrentMatchId } from '../../helpers/getCurrentMatchId';
import { getSeasonIdFromMatchId } from '../../helpers/getSeasonIdFromMatchId';
import { validateNewMatch } from '../validator/matchValidator';
import VoteService from '../service/VoteService';
import MessengerService from '../service/messengerService';

const MAX_VOTE_COUNT = 1;

const MatchWorkflowError_InvalidMatchId = () => new ApiError(404, 'Invalid match id');
const MatchWorkflowError_NotFound = () => new ApiError(404, 'A match with the specified ID was not found');
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
  if (currentMatch == null) {
    throw MatchWorkflowError_NoMatchAtTheMoment();
  }

  const [reply, playerId] = await VoteService.onNewMessage(currentMatch, userId, message);

  if (playerId) {
    if (!currentMatch.messages[userId]) {
      currentMatch.messages[userId] = [];
    }
    if(currentMatch.messages[userId].length >= MAX_VOTE_COUNT){
      // user already voted
      return;
    }
    currentMatch.messages[userId].push(playerId);
    await updateMatch(currentMatch);
  }
  if(reply){
    await MessengerService.sendMessage(userId, reply);
  }
}

async function updateMatch(match: Match): Promise<Match>{
  return MatchRepository.updateMatch(match);
}

async function deleteMatch(matchId: number): Promise<void>{
  const match = await getMatch(matchId);
  if (match == null) {
    throw MatchWorkflowError_NotFound();
  }
  // Remove match from season
  const seasonId = getSeasonIdFromMatchId(matchId);
  const season = await SeasonWorkflow.getSeason(seasonId);
  const matchIdString = `${matchId}`;
  if (season != null) {
    const updatedMatchIds = season.matchIds.filter((id) => id !== matchIdString);
    season.matchIds = updatedMatchIds;
    await SeasonWorkflow.updateSeason(season);
  }

  return MatchRepository.deleteMatch(`${matchId}`);
}

async function addMessageTest(message: string){
  const currentMatchId = getCurrentMatchId();
  const currentMatch = await getMatch(currentMatchId);
  if (currentMatch == null) {
    throw MatchWorkflowError_NoMatchAtTheMoment();
  }

  const [reply, playerName] = await VoteService.onNewMessageTest(currentMatch, message);
  console.log("player", playerName)
  console.log("reply", reply)
}

const MatchWorkflow = {
  getMatch,
  createMatch,
  addMessage,
  addMessageTest,
  updateMatch,
  deleteMatch
};

export default MatchWorkflow;