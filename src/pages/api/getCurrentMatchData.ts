import { NextApiHandler } from "next";
import { getCurrentMatchData } from "../../app/repository/matchRepository";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";

const getCurrentMatchDataAPI: NextApiHandler = async (_request, response) => {
  return asyncSafetyWrap(
    async () => {
        const match = await getCurrentMatchData();
    return response.status(200).json({
      match
    });
  });
};

export default getCurrentMatchDataAPI;