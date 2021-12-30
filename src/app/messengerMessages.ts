import { addDoc, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
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
      try {
        const messages = []
        querySnapshot?.forEach((doc) => {
          const currentMatchId = doc.id;
          if (currentMatchId === matchId || !matchId) {
            const matchData = doc.data();
            const { messages: matchMessages = [] } = matchData;
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
      } catch (error) {
        return [(error as Error).message]
      }
    })
    .catch((error) => {
      console.error('error', error)
      return [(error as Error).message]
    })
};

export const setMessage = async ({ matchId, senderId, body }: Message): Promise<boolean> => {
  return Promise.resolve()
    .then(() => doc(db, COLLECTION_KEY, matchId))
    .then(async (matchRef) => {
      if (matchRef) {
        await updateDoc(matchRef, {
          ['messages.' + senderId]: arrayUnion(body)
        });
        return true;
      }
      return false;
    })
};