import { verify } from "crypto";
import { NextApiRequest } from "next";
import { addMessage } from "./addMessage";
import { verificationChallenge } from "./verificationChallenge";

export const MessageController = {
    handleRequest: async(request : NextApiRequest) => {
        switch(request.method){
            case 'GET': return await verificationChallenge(request);
            case 'POST': return await addMessage(request);
        }
    }
}