import { ApiError } from 'next/dist/server/api-utils';
import { Player } from '../repository/playerRepository';

const PlayerRequestError_MissingParameter = (parameter: string): ApiError => new ApiError(400, `The following parameter is missing ${parameter}`);
const PlayerRequestError_InvalidAlias = (): ApiError => new ApiError(400, 'the alias parameter must be a valid string list and contain at least one value');

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