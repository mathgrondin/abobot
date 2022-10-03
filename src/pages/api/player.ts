import { NextApiHandler } from 'next';
import { PlayerController } from '../../app/controller/player';
import { handleRequest } from '../../helpers/handleRequest';

const playerApi : NextApiHandler = async (request, response) => handleRequest(response, async () => {
  const result = await PlayerController.handleRequest(request);
  response.status(200).json(result);
});

export default playerApi;