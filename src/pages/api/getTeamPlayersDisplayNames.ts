import { NextApiHandler } from "next";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
import { getTeamPlayersDisplayNames } from "../../app/repository/playerRepository"
import { getCurrentSeasonId } from "../../helpers/epoch";
/**
* @swagger
* /api/getTeamPlayersDisplayNames:
*   get:
*     summary: get players display names
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
const getTeamPlayersDisplayNamesAPI : NextApiHandler = async (_request, response) => {
    
    return asyncSafetyWrap(
        async () => {
            const seasonId = (_request.query.seasonId ? _request.query.seasonId : getCurrentSeasonId()).toString()
            const teamId : string = _request.query.teamId.toString()
            const teamPlayersDisplayNames : string[] = await getTeamPlayersDisplayNames(seasonId, teamId)
            return response.status(200).json(
                teamPlayersDisplayNames
            )
        }
    )
}

export default getTeamPlayersDisplayNamesAPI


