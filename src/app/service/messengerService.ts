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

      const requestInit = {
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
      const url = `https://graph.facebook.com/v14.0/me/messages?access_token=${process.env.ACCESS_TOKEN}`
      try{
        const response = await fetch(url, requestInit);
        if(response.status != 200){
          process.stdout.write(`Error sending message: ${response.status}`);
        }
<<<<<<< HEAD
      );
=======
      } catch (e){
        process.stdout.write(`Error sending message: ${e.message}`);
      }
>>>>>>> da6a8fc (use vote)
    });
}

const MessengerService = {
  sendMessage
};

export default MessengerService;