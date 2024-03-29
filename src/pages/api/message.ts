import { NextApiHandler } from 'next';
import { MessageController } from '../../app/controller/message';
import { handleRequest } from '../../helpers/handleRequest';

const messageApi : NextApiHandler = async (request, response) => handleRequest(response, async () => {
  const result = await MessageController.handleRequest(request);
  response.status(200).json(result);
});

export default messageApi;