import { readCollection } from "../../firebase/firestoreHelper";

export type Match = {
  messages: {
    [id: string]: string[]
  },
  teams: string[]
}

export function getMatch(matchId: string): Promise<Match | undefined> {
  return Promise.resolve()
    .then(() => readCollection('matchs'))
    .then((collectionSnapshot) => {
      const matchSnapshot = collectionSnapshot.docs.find(d => d.id === matchId);
      if (matchSnapshot) {
        const { messages = {}, teams = [] } = matchSnapshot?.data();
        const match: Match = {
          messages,
          teams
        };
        return match;
      }
    });
}

export function getCurrentMatchId(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const matchId = `${year}${month}${day}`;
  return matchId;
}

export function getAllMatchIds(): Promise<string[]> {
  return Promise.resolve()
    .then(() => readCollection('matchs'))
    .then((collectionSnapshot) => {
      return collectionSnapshot.docs.map(d => d.id);
    });
}

export function getCurrentMatch(): Promise<Match | undefined> {
  const matchId = getCurrentMatchId();
  return getMatch(matchId);
}
