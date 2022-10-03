import { ApiError } from 'next/dist/server/api-utils';
import { Season } from '../repository/seasonRepository';

export const A_TEAM_INDEX = 0;
export const B_TEAM_INDEX = 1;

export const InvalidNewMatchQuery_LenghtMustBeTwo = (length: number): ApiError => new ApiError(400, `Two team ids must be provided. Received: ${length}`);
export const InvalidNewMatchQuery_MustNotBeNull = (): ApiError => new ApiError(400, 'Team identifiers must not be null');
export const InvalidNewMatchQuery_MustNotBeEqual = (): ApiError => new ApiError(400, 'Team identifiers must not the same');
export const InvalidNewMatchQuery_TeamNotPlayingThisSeason = (teamId: string, seasonId: string): ApiError => new ApiError(400, `The following team does not play in the ${seasonId} season: ${teamId}`);
export const InvalidNewMatchQuery_MatchAlreadyExists = (): ApiError => new ApiError(400, 'Match already exists');

export function validateNewMatch(matchId: number, teamIds: string[], season: Season){
  if(teamIds.length != 2){
    throw InvalidNewMatchQuery_LenghtMustBeTwo(teamIds.length);
  }

  const teamA = teamIds[A_TEAM_INDEX];
  const teamB = teamIds[B_TEAM_INDEX];
  if(teamA == null || teamB == null){
    throw InvalidNewMatchQuery_MustNotBeNull();
  }

  if(teamA == teamB){
    throw InvalidNewMatchQuery_MustNotBeEqual();
  }

  teamIds.forEach((teamId) => {
    if(!season.teamIds.includes(teamId)){
      throw InvalidNewMatchQuery_TeamNotPlayingThisSeason(teamId, season.id);
    }
  });

  if(season.matchIds.includes(`${matchId}`)){
    throw InvalidNewMatchQuery_MatchAlreadyExists();
  }
}