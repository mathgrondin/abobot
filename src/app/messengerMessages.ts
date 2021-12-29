import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

export type Message = {
  senderId: string,
  matchId: string,
  body: string,
}

const COLLECTION_KEY = 'matchs';

export const getMessages = async (matchId?: string): Promise<string[]> => {
  return Promise.resolve()
    .then(() => getDocs(collection(db, COLLECTION_KEY)))
    .then((querySnapshot) => {
      const messages = []
      querySnapshot?.forEach((doc) => {
        const currentMatchId = doc.id;
        if (currentMatchId === matchId || !matchId) {
          const matchData = doc.data();
          const { messages: matchMessages = [] } = matchData;
          console.log('currentMatchId', currentMatchId, matchMessages);
          Object.values(matchMessages).forEach((messagesByUser: string[]) => {
            if (Array.isArray(messagesByUser)) {
              messagesByUser.forEach(m => messages.push(m))
            }
            if (typeof messagesByUser === 'string') {
              messages.push(messagesByUser)
            }
          })
        }
      });
      return messages;
    })
    .catch((error) => {
      console.log('error', error)
      return [];
    })
};

export const setMessage = async ({ matchId, senderId, body }: Message): Promise<boolean> => {
  return Promise.resolve()
    .then(() => {
      const matchRef = doc(db, COLLECTION_KEY, matchId);
      if (matchRef) {
        setDoc(matchRef, {
          messages: {
            [senderId]: body
          }
        }, { merge: true });
      }
      return false;
    })
};