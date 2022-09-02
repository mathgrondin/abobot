import { NextApiRequest } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { Team } from '../../repository/teamRepository';
import TeamWorkflow from '../../workflow/teamWorkflow';

const TeamRequestError_TeamNotFound = () => new ApiError(404, 'Team not found');

/**
* @swagger
* /api/team:
*   get:
*     summary: gets a team
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - name: teamId
*         description: the team id to get
*         required: true
*         schema:
*            type: uuid
*     responses:
*       200:
*         description: 
*/
export async function getTeam(request: NextApiRequest): Promise<Team> {
  const teamId = request.query.teamId as string;
  const team = await TeamWorkflow.getTeam(teamId);
  if(team == null){
    throw TeamRequestError_TeamNotFound();
  }
  return team;
}