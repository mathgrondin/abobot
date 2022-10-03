import { NextApiHandler } from 'next';
import { SeasonController } from '../../app/controller/season';
import { handleRequest } from '../../helpers/handleRequest';

const seasonApi : NextApiHandler = async (request, response) => handleRequest(response, async () => {
  const result = await SeasonController.handleRequest(request);
  response.status(200).json(result);
});

export default seasonApi;


