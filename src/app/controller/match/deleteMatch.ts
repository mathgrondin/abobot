import { NextApiRequest, NextApiResponse } from "next"
import MatchWorkflow from "../../workflow/matchWorkflow"

/**
 * @swagger
 *  '/matches/{matchId}': {
 *   delete: {
 *     summary: 'Delete a match by ID',
 *     description: 'Deletes the match with the specified ID',
 *     parameters: [
 *       {
 *         name: 'matchId',
 *         in: 'path',
 *         description: 'The ID of the match to delete',
 *         required: true,
 *         schema: {
 *           type: 'string'
 *         }
 *       }
 *     ],
 *     responses: {
 *       '204': {
 *         description: 'The match was successfully deleted'
 *       },
 *       '404': {
 *         description: 'A match with the specified ID was not found'
 *       }
 *     }
 *   }
 * }
 */
export async function deleteMatch(request: NextApiRequest) {
    const matchId = parseInt(request.query.matchId as string);
    await MatchWorkflow.deleteMatch(matchId);
    return "Ok"
}