import { NextApiRequest } from 'next';
import { Season } from '../../repository/seasonRepository';
import SeasonWorkflow from '../../workflow/seasonWorkflow';

/**
* @swagger
* /api/season:
*   get:
*     summary: gets a season
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - name: seasonId
*         description: the season id to get. Must be in the following format YYYYYYYY
*         required: true
*         example: 20222023
*         schema:
*            type: string
*     responses:
*       200:
*         description: 
*/
export async function getSeason(request: NextApiRequest): Promise<Season> {
    const seasonId = request.query.seasonId as string;
    const season = await SeasonWorkflow.getSeason(seasonId);
    return season;
}