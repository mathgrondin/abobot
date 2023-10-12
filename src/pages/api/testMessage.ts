import { NextApiHandler } from 'next';
import { MessageController } from '../../app/controller/message';
import { handleRequest } from '../../helpers/handleRequest';

const testMessageApi: NextApiHandler = async (request, response) => handleRequest(response, async () => {
      const result = await MessageController.handleRequest(request);
    response.status(200).json({result: JSON.stringify(result)});
});

export default testMessageApi;