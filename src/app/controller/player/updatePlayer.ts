import { NextApiRequest } from 'next';
import { Player } from '../../repository/playerRepository';
import PlayerWorkflow from '../../workflow/playerWorkflow';

/**
* @swagger
* /api/player:
*   put:
*     summary: update player
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - in: body
*       - name: player
*         description: players full name
*         required: true
*         schema:
*            type: object
*            name: player
*            description: the player to update
*            properties:
*               name: 
*                   type: string
*               alias:
*                   type: string[]
*     responses:
*       200:
*         description: 
*/
export async function updatePlayer(request: NextApiRequest): Promise<Player> {
  const playerId = request.query.playerId as string;
  const player = await PlayerWorkflow.updatePlayer(request.body as Player);
  return player;
}