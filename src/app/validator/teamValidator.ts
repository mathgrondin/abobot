import { ApiError } from 'next/dist/server/api-utils';
import { Team } from '../repository/teamRepository';
import SeasonWorkflow from '../workflow/seasonWorkflow';
import TeamWorkflow from '../workflow/teamWorkflow';

const TeamRequestError_CreateTeamMissingParameters = (paramName: string) => new ApiError(400, `Failed to create a new team. Missing parameter ${paramName}`);
const TeamRequestError_SeasonNotFound = (seasonId: string) => new ApiError(404, `Season with id '${seasonId}' not found`);
const TeamRequestError_AlreadyExists = (name: string, seasonId: string) => new ApiError(404, `Team with name '${name}' already exists in season '${seasonId}'`);

export async function ValidateNewTeam(teamCandidate: Team){
  const { name = undefined, seasonId = undefined, iconPath = undefined } = teamCandidate;
  if(name == null || name.length === 0){
    throw TeamRequestError_CreateTeamMissingParameters('name');  
  }

  if(iconPath == null || iconPath.length === 0){
    throw TeamRequestError_CreateTeamMissingParameters('iconPath');  
  }

  if(seasonId == null || seasonId.length === 0){
    throw TeamRequestError_CreateTeamMissingParameters('seasonId');  
  }

  const season = await SeasonWorkflow.getSeason(seasonId);
  if(season == null){
    throw TeamRequestError_SeasonNotFound(seasonId);  
  }

  const teams = await TeamWorkflow.getTeamsByName(name);
  if(teams != null && teams.some(team => team.seasonId === seasonId)){
    throw TeamRequestError_AlreadyExists(name, seasonId);  
  }

}