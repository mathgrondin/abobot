import { NextApiRequest } from "next";
import { createMatch } from "./createMatch";
import { getMatch } from "./getMatch";

export const MatchController = {
    handleRequest: async(request : NextApiRequest) => {
        switch(request.method){
            case 'GET': return await getMatch(request);
            case 'PUT': return await createMatch(request);
        }
    }
}