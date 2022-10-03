import { NextApiRequest } from 'next';
import { Match } from '../../repository/matchRepository';
import MatchWorkflow from '../../workflow/matchWorkflow';

/**
* @swagger
* /api/match:
*   post:
*     summary: creates a new match
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - name: teamIds
*         description: list of the two teams participating to the match
*         required: true
*         example: rouge,bleu
*         schema:
*            type: string[]
*     responses:
*       200:
*         description: 
*/
export async function createMatch(request: NextApiRequest): Promise<Match> {
  const teamIds = (request.query.teamIds as string).split(',');
  const newMatch = await MatchWorkflow.createMatch(teamIds);
  return newMatch;
}