import { NextApiHandler } from 'next';
import { TeamController } from '../../app/controller/team';
import { handleRequest } from '../../helpers/handleRequest';

const teamApi : NextApiHandler = async (request, response) => handleRequest(response, async () => {
    const result = await TeamController.handleRequest(request);
    response.status(200).json(result);
});

export default teamApi;