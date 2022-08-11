import { NextApiHandler } from 'next';
import { MatchController } from '../../app/controller/match';
import { handleRequest } from '../../helpers/handleRequest';

const matchApi : NextApiHandler = async (request, response) => handleRequest(response, async () => {
    const result = await MatchController.handleRequest(request);
    response.status(200).json(result);
});

export default matchApi;


