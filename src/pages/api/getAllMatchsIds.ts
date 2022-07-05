import { NextApiHandler } from "next";
import { getAllMatchIds } from "../../app/repository/matchRepository"
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
import { getCurrentSeasonId } from "../../helpers/epoch";

/**
 * @swagger
 * /api/getAllMatchsIds:
 *   get:
 *     summary: Get all matchs ids
 *     description: Get all matchs ids in specified season. If no season is specified, returns current season ids.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: seasonId
 *         description: Season id, e.g. "20202021"
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: match ids array
 */
const getAllMatchsIdsAPI: NextApiHandler = async (_request, response) => {
  return asyncSafetyWrap(async () => {
    // returns current season query parameter seasonId is omitted
    const seasonId = (_request.query.seasonId ? _request.query.seasonId : getCurrentSeasonId()).toString()
    const matchIds : string[] = await getAllMatchIds(seasonId);
    return response.status(200).json({
      matchIds
    });
  });
};

export default getAllMatchsIdsAPI;
