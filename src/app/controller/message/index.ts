import { NextApiRequest } from 'next';
import { addMessage, addMessageTest } from './addMessage';
import { verificationChallenge } from './verificationChallenge';

export const MessageController = {
  handleRequest: async (request: NextApiRequest) => {
    switch (request.method) {
    case 'GET': return await verificationChallenge(request);
    case 'POST': return await addMessage(request);
    case 'PUT': return await addMessageTest(request);
    }
  }
};