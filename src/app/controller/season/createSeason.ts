import { NextApiRequest } from 'next';
import SeasonWorkflow from '../../workflow/seasonWorkflow';

/**
* @swagger
* /api/season:
*   post:
*     summary: creates a new season
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - name: seasonId
*         description: the season id to create. Must be in the following format YYYYYYYY
*         required: true
*         example: 20222023
*         schema:
*            type: string
*     responses:
*       200:
*         description: 
*/
export const createSeason = async (request : NextApiRequest) => {
  const seasonId = request.query.seasonId as string;
  const season = await SeasonWorkflow.createSeason(seasonId);
  return season;
};