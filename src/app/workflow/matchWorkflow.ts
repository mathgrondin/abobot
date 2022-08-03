import { getSeasonIdFromDate } from "../../helpers/getSeasonFromDate";
import { getMonthFromDate, getYearFromDate } from "../../helpers/timeHelper";
import MatchRepository, { Match } from "../repository/matchRepository";
import SeasonWorkflow from "./seasonWorkflow";

async function getMatch(matchId: number): Promise<Match | undefined>{
    var season = getSeasonIdFromDate(matchId);
    console.log('season', season);
    if(!season){
        return undefined;
    }

    const match = await MatchRepository.getMatch(`${matchId}`, season);
    return match;
}

async function createMatch(teamIds: string[]): Promise<Match | undefined>{
    const matchId = Date.now() as number;
    const seasonId = getSeasonIdFromDate(matchId);
    var season = await SeasonWorkflow.getSeason(seasonId);
    console.log('seasonA', season);
    if(season == undefined){
        var season = await SeasonWorkflow.createSeason(seasonId);
    }
    console.log('seasonB', season);
    return undefined;
    // console.log('seasonB', season);
    // season.matchIds.push(`${matchId}`);
    // await SeasonWorkflow.updateSeason(season);
    // const match = await MatchWorkflow.createMatch(teamIds);
    // return match;
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