import { ApiError } from "next/dist/server/api-utils";
import { Exception } from "sass";
import SeasonRepository, { Season } from "../repository/seasonRepository";

export const A_TEAM_INDEX = 0;
export const B_TEAM_INDEX = 1;

export const InvalidTeamQueryParam_LenghtMustBeTwo = (length: number): ApiError => new ApiError(400, `Two team ids must be provided. Received: ${length}`);
export const InvalidTeamQueryParam_MustNotBeNull = (): ApiError => new ApiError(400, 'Team identifiers must not be null');
export const InvalidTeamQueryParam_MustNotBeEqual = (): ApiError => new ApiError(400, 'Team identifiers must not the same');
export const InvalidTeamQueryParam_TeamNotPlayingThisSeason = (teamId: string, seasonId: string): ApiError => new ApiError(400, `The following team does not play in the ${seasonId} season: ${teamId}`);

export function validateNewMatchTeams(teamIds: string[], season: Season){
    if(teamIds.length != 2){
        throw InvalidTeamQueryParam_LenghtMustBeTwo(teamIds.length);
    }
    const teamA = teamIds[A_TEAM_INDEX];
    const teamB = teamIds[B_TEAM_INDEX];
    if(teamA == null || teamB == null){
        throw InvalidTeamQueryParam_MustNotBeNull();
    }
    if(teamA == teamB){
        throw InvalidTeamQueryParam_MustNotBeEqual();
    }
    teamIds.forEach((teamId) => {
        if(!season.teamIds.includes(teamId)){
            throw InvalidTeamQueryParam_TeamNotPlayingThisSeason(teamId, season.id);
        }
    })
}