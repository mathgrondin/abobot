import { NextApiHandler } from "next";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
import { getTeamPlayers } from "../../app/repository/playerRepository"

import { Player } from "../../Types/collectionMap";
import { getCurrentSeasonId } from "../../helpers/epoch";

/**
* @swagger
* /api/getTeamPlayers:
*   get:
*     summary: get array of players Objects in specified team
*     description: 
*     produces:
*       - application/json
*     parameters:
*       - name: seasonId
*         description: format is YYYYYY, Default is current season
*         in: query
*         required: false
*         type: string
*       - name: teamId
*         description: Team id format is lowercase "color"
*         in: query
*         required: true
*         type: string
*     responses:
*       200:
*         description: 
*/
const getTeamPlayersAPI : NextApiHandler = async (_request, response) => {
    
    return asyncSafetyWrap(
        async () => {
            let teamId :string = ""
            const seasonId = (_request.query.seasonId ? _request.query.seasonId : getCurrentSeasonId()).toString()
            if (_request.query.teamId) {
                teamId = _request.query.teamId.toString()
                const teamPlayers : Player[] = await getTeamPlayers(seasonId, teamId)
                return response.status(200).json(
                    teamPlayers
                )

            } else {
                
                return response.status(200).json(
                    {}
                )
            }
            
        }
    )
}




export default getTeamPlayersAPI

