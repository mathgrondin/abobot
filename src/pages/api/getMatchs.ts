import { NextApiHandler } from "next";
import { getAllMatchIds } from "../../app/matchManager";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";

const getMatchsAPI: NextApiHandler = async (_request, response) => {
  return asyncSafetyWrap(async () => {
    const matchIds = await getAllMatchIds();
    return response.status(200).json({
      matchIds
    });
  });
};

export default getMatchsAPI;