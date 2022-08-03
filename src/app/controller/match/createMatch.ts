import { NextApiRequest } from "next";
import MatchWorkflow from "../../workflow/matchWorkflow";

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
*         description: list of two teams participating to the match
*         required: true
*         type: string[]
*     responses:
*       200:
*         description: 
*/
export async function createMatch(request: NextApiRequest) {
    const teamIds = (request.query.teamIds as string).split(',');
    const result = await MatchWorkflow.createMatch(teamIds);
    console.log('teamIds', teamIds[1]);
}