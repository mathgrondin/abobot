import { NextApiRequest } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { Player } from '../../repository/playerRepository';
import PlayerWorkflow from '../../workflow/playerWorkflow';

const PlayerRequestError_PlayerNotFound = () => new ApiError(404, 'Player not found');

/**
* @swagger
* /api/player:
*   get:
*     summary: gets a player
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - name: playerId
*         description: the player id to get
*         required: true
*         schema:
*            type: uuid
*     responses:
*       200:
*         description: 
*/
export async function getPlayer(request: NextApiRequest): Promise<Player> {
  const playerId = request.query.playerId as string;
  const player = await PlayerWorkflow.getPlayer(playerId);
  if(player == null){
    throw PlayerRequestError_PlayerNotFound();
  }
  return player;
}