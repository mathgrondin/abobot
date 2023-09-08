import { randomUUID } from 'crypto';
import { readCollection, updateDocument, writeDocument } from '../../../firebase/firestoreHelper';

export type Player = {
    id: string,
    name: string,
    alias: string[],
}

const PLAYER_COLLECTION_ID = 'players';

export function getPlayer(playerId: string): Promise<Player | undefined>{
  return Promise.resolve()
    .then(() =>  readCollection(PLAYER_COLLECTION_ID))
    .then((collectionSnapshot) => {
      const playerSnapshot = collectionSnapshot.docs.find(document => document.id == playerId);
      if(!playerSnapshot){
        return undefined;
      }
      const player = playerSnapshot.data() as Player;
      return player;
    });
}

export async function createPlayer(playerCandidate: Player): Promise<Player>{
  const playerId = randomUUID();
  const player: Player = {
    ...playerCandidate,
    id: playerId
  };
    
  return Promise.resolve()
    .then(() =>  writeDocument(PLAYER_COLLECTION_ID, playerId, player))
    .then(() => {
      console.log('New Player Created', JSON.stringify(player));
      return player;
    });
}

export function updatePlayer(player: Player): Promise<Player>{
  return Promise.resolve()
    .then(() =>  updateDocument(PLAYER_COLLECTION_ID, player.id, player))
    .then(() => player);
}

const PlayerRepository = {
  getPlayer,
  createPlayer,
  updatePlayer,
};

export default PlayerRepository;