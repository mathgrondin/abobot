import { NextApiHandler } from "next";
import { getPlayer } from "../../app/repository/playerRepository";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
import { getCurrentSeasonId } from "../../helpers/epoch";

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