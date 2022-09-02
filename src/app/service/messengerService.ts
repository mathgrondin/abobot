function sendMessage(userId: string, message: string): Promise<void>{
  return Promise.resolve();
}

const MessengerService = {
  sendMessage
};

export default MessengerService;