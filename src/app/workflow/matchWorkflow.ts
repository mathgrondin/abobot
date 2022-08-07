import { getCurrentMatchId } from "../../helpers/getCurrentMatchId";
import { getSeasonIdFromMatchId } from "../../helpers/getSeasonIdFromMatchId";
import MatchRepository, { Match } from "../repository/matchRepository";
import SeasonWorkflow from "./seasonWorkflow";

async function getMatch(matchId: number): Promise<Match | undefined>{
    var season = getSeasonIdFromMatchId(matchId);
    if(!season){
        return undefined;
    }

    const match = await MatchRepository.getMatch(`${matchId}`, season);
    return match;
}

async function createMatch(teamIds: string[]): Promise<Match | undefined>{
    const matchId = getCurrentMatchId();
    const seasonId = getSeasonIdFromMatchId(matchId);
    var season = await SeasonWorkflow.getSeason(seasonId);
    if(season == undefined){
        var season = await SeasonWorkflow.createSeason(seasonId);
    }
    season.matchIds.push(`${matchId}`);
    await SeasonWorkflow.updateSeason(season);
    const match = await MatchRepository.createMatch(`${matchId}`, teamIds);
    return match;
}

const updateMatch = (): Promise<Match | undefined> => {
    return undefined;
}

const deleteMatch = (): Promise<Match | undefined> => {
    return undefined;
}

// TODO
// export function createMatch()

// TODO
// export function updateMatch()

// TODO
// export function deleteMatch()

const MatchWorkflow = {
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch
}

export default MatchWorkflow;