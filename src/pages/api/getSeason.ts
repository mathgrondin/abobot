import { NextApiHandler } from "next";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
import { getSeason } from "../../app/repository/seasonRepository"
import { Season } from "../../Types/collectionMap";
import { getCurrentSeasonId } from "../../helpers/epoch";
/**
* @swagger
* /api/getSeason:
*   get:
*     summary: get all season data
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - name: seasonId
*         description: format is YYYYYY, Default is current season
*         in: query
*         required: false
*         type: string
*     responses:
*       200:
*         description: 
*/
const getSeasonAPI : NextApiHandler = async (_request, response) => {
    return asyncSafetyWrap(
        async () => {
            const seasonId = (_request.query.seasonId ? _request.query.seasonId : getCurrentSeasonId()).toString()
            const season : Season = await getSeason(seasonId);
            return response.status(200).json(
                season
            )
        }
    )
}

export default getSeasonAPI