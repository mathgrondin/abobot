import { NextApiRequest } from 'next';
import MatchWorkflow from '../../workflow/matchWorkflow';

/**
* @swagger
* /api/match:
*   get:
*     summary: get a specific match
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - name: matchId
*         description: the id of the match to get. A match id is produced from the current day in UNIX format
*         in: query
*         required: true
*         type: string
*     responses:
*       200:
*         description: 
*/
export async function getMatch(request: NextApiRequest) {
    const matchId = parseInt(request.query.matchId as string);
    const match = await MatchWorkflow.getMatch(matchId);
    return match;
}