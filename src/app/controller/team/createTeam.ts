import { NextApiRequest } from 'next';
import { Team } from '../../repository/teamRepository';
import TeamWorkflow from '../../workflow/teamWorkflow';

/**
* @swagger
* /api/team:
*   post:
*     summary: creates a new team
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - in: body
*       - name: team
*         description: the team to create
*         required: true
*         schema:
*            type: object
*            name: team
*            description: the team to create
*            properties:
*               name: 
*                   type: string
*               seasonId:
*                   type: string
*               iconPath:
*                   type: string
*     responses:
*       200:
*         description: 
*/
export async function createTeam(request: NextApiRequest): Promise<Team> {
  const team = await TeamWorkflow.createTeam(request.body as Team);
  return team;
}