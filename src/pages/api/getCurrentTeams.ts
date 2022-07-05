import { NextApiHandler } from "next";
import { getCurrentTeams } from "../../app/repository/matchRepository";
import { asyncSafetyWrap } from "../../helpers/safetyWrap";

const getCurrentTeamsAPI : NextApiHandler = async (_request, response) => {
    return asyncSafetyWrap(
        async () => {
            const teams = await getCurrentTeams()
            return response.status(200).json(
                teams
            )
        }
    )
}

export default getCurrentTeamsAPI