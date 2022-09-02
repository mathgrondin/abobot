import { ApiError } from 'next/dist/server/api-utils';
import PlayerRepository, { Player } from '../repository/playerRepository';
import { validateNewPlayer } from '../validator/playerValidator';
import TeamWorkflow from './teamWorkflow';

const PlayerWorkflowError_InvalidTeamId = () => new ApiError(404, 'Invalid team id');
const PlayerWorkflowError_TeamIdNotFound = (teamId: string) => new ApiError(404, `Team with id ${teamId} does not exist`);

async function getPlayer(playerId: string): Promise<Player | undefined> {
  const player = await PlayerRepository.getPlayer(playerId);
  return player;
}

async function  getPlayersByTeamId(teamId: string): Promise<Player[] | undefined> {
  if(!teamId){
    throw PlayerWorkflowError_InvalidTeamId();
  }
  const team = await TeamWorkflow.getTeam(teamId);
  if(team == null){
    throw PlayerWorkflowError_TeamIdNotFound(teamId); 
  }
  const players = (await Promise.all(team.playerIds.map(async (playerId) => 
    await getPlayer(playerId))
  ));
  return players;
}

async function createPlayer(playerCandidate: Player): Promise<Player | undefined> {
  return Promise.resolve()
    .then(async () => validateNewPlayer(playerCandidate))
    .then(async () => await PlayerRepository.createPlayer(playerCandidate));
}

const updatePlayer = (): Promise<Player | undefined> => {
  return undefined;
};

const deletePlayer = (): Promise<Player | undefined> => {
  return undefined;
};

const PlayerWorkflow = {
  getPlayer,
  getPlayersByTeamId,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

export default PlayerWorkflow;