import { NextApiRequest } from 'next';
import MatchWorkflow from '../../workflow/matchWorkflow';

/**
* @swagger
* /api/match:
*   put:
*     summary: updates a match
*     description: 
*     produces:
*       - application/json
*     responses:
*       200:
*         description: 
*/
export async function updateMatch(request: NextApiRequest) {
  const { match } = request.body;
  const updatedMatch = await MatchWorkflow.updateMatch(match);
  return updatedMatch;
}