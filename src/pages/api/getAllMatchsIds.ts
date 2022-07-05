import { NextApiHandler } from "next";
import { getAllMatchIds } from "../../app/repository/matchRepository"
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
import { getCurrentSeasonId } from "../../helpers/epoch";

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