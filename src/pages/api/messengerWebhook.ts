import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { setMessage } from '../../app/messengerMessages';
import store from '../../app/store';

const messengerWebhook: NextApiHandler = async (request, response) => {
  switch (request.method) {
    case 'POST': return handleMessengerPost(request, response)
    case 'GET':
    default:
      return handleMessengerGet(request, response)
  }
}

function handleMessengerGet(request: NextApiRequest, response: NextApiResponse) {
  const { query } = request;
  const { hub } = query;
  if (query) {
    // Parse the query params
    const mode = request.query['hub.mode'];
    const token = request.query['hub.verify_token'];
    if (mode && token) {
      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        const challenge = request.query['hub.challenge'];
        response.status(200).json(challenge);
        return;
      }
    }
  }
  response.status(403).send('verify tokens do not match');
}

function handleMessengerPost(request: NextApiRequest, response: NextApiResponse) {
  const { object, entry } = request?.body;
  if (object === 'page' && Array.isArray(entry)) {
    const { messaging = undefined } = entry.find((value) => !!value.messaging && !!value.messaging[0].message);
    if (messaging) {
      const { message = undefined, sender = {} } = messaging[0];
      if (message) {
        const { id = undefined } = sender;
        const { text = undefined } = message;
        setMessage({
          matchId: '1640194878059',
          senderId: id,
          body: text
        })
        response.status(200).send('all good');
      }
      return;
    }
  }
  response.status(404).send('not found');
}
export default messengerWebhook