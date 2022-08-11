import MatchRepository, { Match } from '../repository/matchRepository';
import SeasonWorkflow from './seasonWorkflow';
import { ApiError } from 'next/dist/server/api-utils';
import { getCurrentMatchId } from '../../helpers/getCurrentMatchId';
import { getSeasonIdFromMatchId } from '../../helpers/getSeasonIdFromMatchId';
import { validateNewMatchTeams } from '../validator/matchValidator';

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
    validateNewMatchTeams(teamIds, season);
    season.matchIds.push(`${matchId}`);
    await SeasonWorkflow.updateSeason(season);
    const match = await MatchRepository.createMatch(`${matchId}`, teamIds);
    return match;
}

async function addMessage(userId: string, message: string): Promise<Match> {
    const matchId = getCurrentMatchId();
    const match = await getMatch(matchId);
    if (match == null) {
        throw MatchWorkflowError_NoMatchAtTheMoment();
    }

    match.messages[userId].push(message);
    await updateMatch(match);
    return match;
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