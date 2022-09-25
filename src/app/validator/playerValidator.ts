import { ApiError } from 'next/dist/server/api-utils';
import { Player } from '../repository/playerRepository';

const PlayerRequestError_MissingParameter = (parameter: string): ApiError => new ApiError(400, `The following parameter is missing ${parameter}`);
const PlayerRequestError_InvalidAlias = (): ApiError => new ApiError(400, 'the alias parameter must be a valid string list and contain at least one value');
const PlayerRequestError_MissingPlayer = (playerId: string): ApiError => new ApiError(404, `The following player is missing ${playerId}`);
const PlayerRequestError_InvalidUpdate = (): ApiError => new ApiError(400, 'Updating a player requiers at least a name or alias');

export function validateNewPlayer(player: Player){
  if(!player.name){
    throw PlayerRequestError_MissingParameter('name');
  }
  if(!player.alias){
    throw PlayerRequestError_MissingParameter('alias');
  }
  if(!Array.isArray(player.alias) || player.alias.length == 0){
    throw PlayerRequestError_InvalidAlias();
  }
}

export function validateUpdatedPlayer(player: Player, playerCandidate: Player){
  if(player == null){
    throw PlayerRequestError_MissingPlayer(player.id);
  }
  if(!player.name || !player.alias){
    throw PlayerRequestError_InvalidUpdate();
  }
}