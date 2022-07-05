import { NextApiHandler } from "next";
import { getPlayer } from "../../app/repository/playerRepository";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
import { getCurrentSeasonId } from "../../helpers/epoch";
/**
* @swagger
* /api/getPlayer:
*   get:
*     summary: get unique player data
*     description: get unique player data
*     produces:
*       - application/json
*     parameters:
*       - name: seasonId
*         description: season years e.g "20202021", Default is current season
*         in: query
*         required: false
*         type: string
*       - name: playerId
*         description: Player Id e.g "dydy"
*         in: query
*         required: true
*         type: string
*     responses:
*       200:
*         description: 
*/
const getPlayerAPI: NextApiHandler = async (_request, response) => {
  return asyncSafetyWrap(
    async () => {
        const seasonId = (_request.query.seasonId ? _request.query.seasonId : getCurrentSeasonId()).toString()
        const playerId : string = _request.query.playerId.toString()
        const player = await getPlayer(seasonId, playerId);
    return response.status(200).json({
      player
    });
  });
};

export default getPlayerAPI;