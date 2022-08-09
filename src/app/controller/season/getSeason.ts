import { NextApiRequest } from 'next';
import { ApiError } from 'next/dist/server/api-utils';
import { Season } from '../../repository/seasonRepository';
import SeasonWorkflow from '../../workflow/seasonWorkflow';

const SeasonRequestError_SeasonNotFound = () => new ApiError(404, 'Season not found');

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
    if(season != null){
        throw SeasonRequestError_SeasonNotFound();
    }
    return season;
}