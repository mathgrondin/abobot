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

      // const url = `https://graph.facebook.com/v14.0/2222667838060764/messages?access_token=${process.env.ACCESS_TOKEN}`;
      // const response = await fetch(url, { method: 'POST', body: JSON.stringify(body) });
      const response = await fetch(
        `https://graph.facebook.com/v14.0/me/messages?access_token=${process.env.ACCESS_TOKEN}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            messaging_type: 'RESPONSE',
            recipient: {
              id: userId,
            },
            message: {
              text: message,
            },
          }),
        }
      );
    });
}

const MessengerService = {
  sendMessage
};

export default MessengerService;