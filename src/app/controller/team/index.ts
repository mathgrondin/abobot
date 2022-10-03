import { NextApiRequest } from 'next';
import { createTeam } from './createTeam';
import { getTeam } from './getTeam';

export const TeamController = {
  handleRequest: async(request : NextApiRequest) => {
    switch(request.method){
    case 'GET': return await getTeam(request);
    case 'POST': return await createTeam(request);
    }
  }
}; 