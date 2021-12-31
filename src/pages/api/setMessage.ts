import { NextApiHandler } from "next";
import { Message, setMessage } from "../../app/messengerMessages";

const setMessagesAPI: NextApiHandler = async (request, response) => {
  const successful = await setMessage(request.query as Message);
  if (successful) {
    response.status(200).json('success');
  } else {
    response.status(400).json('failed');
  }
};

export default setMessagesAPI;