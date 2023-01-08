import MatchWorkflow from "../../workflow/matchWorkflow"
import { NextApiRequest } from "next"

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
 *       '200': {
 *         description: 'Operation result'
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