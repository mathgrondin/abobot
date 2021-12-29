import { NextApiHandler } from "next";
import { getMessages } from "../../app/messengerMessages";

const getMessagesAPI: NextApiHandler = async (request, response) => {
  const { matchId } = request.query;
  response.status(200).json({
    messages: await getMessages(matchId as string)
  })
}

export default getMessagesAPI;