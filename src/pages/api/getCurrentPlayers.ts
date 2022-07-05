import { NextApiHandler } from "next";
import { getCurrentSeasonId } from "../../helpers/epoch";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
import { getCurrentPlayers } from "../../app/repository/playerRepository";
/**
* @swagger
* /api/getCurrentPlayers:
*   get:
*     summary: get players in current match
*     description: get players in current match
*     produces:
*       - application/json
*     responses:
*       200:
*         description: 
*/
const getCurrentPlayersAPI : NextApiHandler = async (_request, response) => {
    return asyncSafetyWrap(
        async() => {
            const currentPlayers  = await getCurrentPlayers()
            return response.status(200).json(
                currentPlayers
            )

        }
    )

}

export default getCurrentPlayersAPI