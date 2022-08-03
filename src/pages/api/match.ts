import { NextApiHandler } from "next";
import { MatchController } from "../../app/controller/match";

const matchApi : NextApiHandler = async (request, response) => {
    const result = await MatchController.handleRequest(request)
    return response.status(200).json(result);
}

export default matchApi;


