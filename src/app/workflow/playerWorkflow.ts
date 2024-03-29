import { ApiError } from 'next/dist/server/api-utils';
import PlayerRepository, { Player } from '../repository/playerRepository';
import { validateNewPlayer, validateUpdatedPlayer } from '../validator/playerValidator';
import TeamWorkflow from './teamWorkflow';

const PlayerWorkflowError_InvalidTeamId = () => new ApiError(404, 'Invalid team id');
const PlayerWorkflowError_TeamIdNotFound = (teamId: string) => new ApiError(404, `Team with id ${teamId} does not exist`);

async function getPlayer(playerId: string): Promise<Player | undefined> {
  const player = await PlayerRepository.getPlayer(playerId);
  return player;
}

async function  getPlayersByTeamId(teamId: string): Promise<Player[]> {
  if(!teamId){
    throw PlayerWorkflowError_InvalidTeamId();
  }
  const team = await TeamWorkflow.getTeam(teamId);
  if(team == null){
    throw PlayerWorkflowError_TeamIdNotFound(teamId); 
  }
  const players = (await Promise.all(team.playerIds.map(async (playerId) => 
    await getPlayer(playerId) as Player)
  ));
  return players;
}

async function createPlayer(playerCandidate: Player): Promise<Player> {
  return Promise.resolve()
    .then(async () => validateNewPlayer(playerCandidate))
    .then(async () => await PlayerRepository.createPlayer(playerCandidate));
}

async function updatePlayer(playerCandidate: Player): Promise<Player> {
  return Promise.resolve()
    .then(async () => await getPlayer(playerCandidate.id))
    .then(async (player) => await validateUpdatedPlayer(player, playerCandidate))
    .then(async () => await PlayerRepository.updatePlayer(playerCandidate));
}

const deletePlayer = (): Promise<undefined> => {
  return Promise.resolve(undefined);
};

const PlayerWorkflow = {
  getPlayer,
  getPlayersByTeamId,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

export default PlayerWorkflow;