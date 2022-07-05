import { NextApiHandler } from "next";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
import { getTeamPlayersDisplayNames } from "../../app/repository/playerRepository"
import { getCurrentSeasonId } from "../../helpers/epoch";

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


