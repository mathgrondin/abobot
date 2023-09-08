import { NextApiRequest } from 'next';
import { Player } from '../../repository/playerRepository';
import PlayerWorkflow from '../../workflow/playerWorkflow';

/**
* @swagger
* /api/player:
*   post:
*     summary: creates a new player
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - in: body
*       - name: player
*         description: the player to create
*         required: true
*         schema:
*            type: object
*            name: player
*            description: the player to create
*            properties:
*               name: 
*                   type: string
*               alias:
*                   type: string[]
*     responses:
*       200:
*         description: 
*/
export async function createPlayer(request: NextApiRequest): Promise<Player | undefined> {
  let playerParam: Player;
  try {
    playerParam = JSON.parse(request.body);
  } catch (e) {
    playerParam = request.body;
  }
  const player = await PlayerWorkflow.createPlayer(playerParam);
  return player;
}