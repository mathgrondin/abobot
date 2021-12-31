import { NextApiHandler } from "next";
import { getMessages } from "../../app/messengerMessages";

const getMessagesAPI: NextApiHandler = async (request, response) => {
  const { matchId } = request.query;
  try {
    const messages = await getMessages(matchId as string);
    response.status(200).json({
      messages
    });
    return;
  } catch (error) {
    console.error(error);
    const message = error.message ?? 'unknown';
    response.status(500).send('Error' + message);
  }
};

export default getMessagesAPI;