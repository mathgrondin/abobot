import { NextApiRequest } from 'next';
import { createPlayer } from './createPlayer';
import { getPlayer} from './getPlayer';
import { updatePlayer } from './updatePlayer';

export const PlayerController = {
  handleRequest: async(request : NextApiRequest) => {
    switch(request.method){
    case 'GET': return await getPlayer(request);
    case 'POST': return await createPlayer(request);
    case 'PUT': return await updatePlayer(request);
    }
  }
}; 