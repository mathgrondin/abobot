import { NextApiRequest } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { Match } from "../../repository/matchRepository";
import MatchWorkflow from "../../workflow/matchWorkflow";

const InvalidMessage_InvalidBody = (reason: string) => new ApiError(400, `Invalid body parameters: ${reason}`);

/**
* @swagger
* /api/message:
*   post:
*     summary: message received from messenger
*     produces:
*       - application/json
*     responses:
*       200:
*         description: 
*/
export async function addMessage(request: NextApiRequest): Promise<string> {
    const { object, entry } = request?.body;
    if (object !== 'page' || !Array.isArray(entry)) {
        throw InvalidMessage_InvalidBody('object value should be page and entry should be an array');
    }

    const { messaging = null } = entry.find((value) => Array.isArray(value.messaging) && value.messaging[0]?.message);
    if (messaging == null) {
        throw InvalidMessage_InvalidBody('messaging should contain a message');
    }

    const text = messaging[0]?.message?.text || null;
    if (messaging == null) {
        throw InvalidMessage_InvalidBody('message should not be null');
    }

    const id = messaging[0]?.sender?.id || null;
    if (id == null) {
        throw InvalidMessage_InvalidBody('sender id should not be null');
    }

    await MatchWorkflow.addMessage(id, text);
    return 'ok';
}