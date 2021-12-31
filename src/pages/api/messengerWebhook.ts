import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { setMessage } from '../../app/messengerMessages';
import store from '../../app/store';

const messengerWebhook: NextApiHandler = async (request, response) => {
  console.log('messengerWebhook', request.method, {
    query: JSON.stringify(request.query),
    body: JSON.stringify(request.body)
  })
  switch (request.method) {
    case 'POST': return handleMessengerPost(request, response)
    case 'GET':
    default:
      return handleMessengerGet(request, response)
  }
}

function handleMessengerGet(request: NextApiRequest, response: NextApiResponse) {
  const { query } = request;
  if (query) {
    // Parse the query params
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
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
  console.log('handleMessengerPost', object, entry)
  if (object === 'page' && Array.isArray(entry)) {
    console.log('object page and entry is array')
    const { messaging = undefined } = entry.find((value) => !!value.messaging && !!value.messaging[0].message);
    if (messaging) {
      console.log('got messaging', JSON.stringify(messaging))
      const { message = undefined, sender = {} } = messaging[0];
      if (message) {
        console.log('got message', JSON.stringify(sender))
        console.log('got message', JSON.stringify(message))
        const { id = undefined } = sender;
        const { text = undefined } = message;
        setMessage({
          matchId: '1640194878059',
          senderId: id,
          body: text
        })
        response.status(200).send('all good');
        return;
      }
    }
  }
  response.status(404).send('not found');
}
export default messengerWebhook