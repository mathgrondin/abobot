import { NextApiRequest } from 'next';
import { createMatch } from './createMatch';
import { getMatch } from './getMatch';
import { updateMatch } from './updateMatch';

export const MatchController = {
    handleRequest: async(request : NextApiRequest) => {
        switch(request.method){
            case 'GET': return await getMatch(request);
            case 'PUT': return await updateMatch(request);
            case 'POST': return await createMatch(request);
        }
    }
};