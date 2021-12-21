import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { reduceEachTrailingCommentRange } from 'typescript';

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
        console.log('WEBHOOK_VERIFIED');
        const challenge = request.query['hub.challenge'];
        response.status(200).json(challenge);
        return;
      }
    }
    console.log('messengerWebhook', query)
    console.log('messengerWebhook', JSON.stringify(hub))
  }
  response.status(403).send('verify tokens do not match');
}

function handleMessengerPost(request: NextApiRequest, response: NextApiResponse) {
  console.log('New message received', JSON.parse(request.body))
  response.send('ok')
}
export default messengerWebhook