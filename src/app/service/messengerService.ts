function sendMessage(userId: string, message: string): Promise<void> {
  return Promise.resolve()
    .then(async () => {
      const body = {
        'messaging_type': 'RESPONSE',
        'recipient': {
          'id': userId
        },
        'message': {
          'text': message
        }
      };

      const url = `https://graph.facebook.com/v14.0/me/messages?access_token=${process.env.ACCESS_TOKEN}`;
      
      const response = await fetch(url, { method: 'POST', body: JSON.stringify(body) });
    });
}

const MessengerService = {
  sendMessage
};

export default MessengerService;