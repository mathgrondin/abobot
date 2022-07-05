import { NextApiHandler } from "next";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";
import { getTeamPlayers } from "../../app/repository/playerRepository"
import { Player } from "../../Types/collectionMap";
import { getCurrentSeasonId } from "../../helpers/epoch";

const getTeamPlayersAPI : NextApiHandler = async (_request, response) => {
    
    return asyncSafetyWrap(
        async () => {
            const seasonId = (_request.query.seasonId ? _request.query.seasonId : getCurrentSeasonId()).toString()
            const teamId : string = _request.query.teamId.toString()
            const teamPlayers : Player[] = await getTeamPlayers(seasonId, teamId)
            return response.status(200).json(
                teamPlayers
            )
        }
    )
}

export default getTeamPlayersAPI


