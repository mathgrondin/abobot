import { NextApiHandler } from "next";
import { getCurrentMatchData } from "../../app/repository/matchRepository";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
/**
* @swagger
* /api/getCurrentMatchData:
*   get:
*     summary: get current match data
*     description: get current match data
*     produces:
*       - application/json
*     responses:
*       200:
*         description: 
*/
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