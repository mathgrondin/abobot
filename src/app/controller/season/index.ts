import { NextApiRequest } from 'next';
import { createSeason } from './createSeason';
import { getSeason } from './getSeason';

export const SeasonController = {
    handleRequest: async(request : NextApiRequest) => {
        switch(request.method){
            case 'GET': return await getSeason(request);
            case 'POST': return await createSeason(request);
        }
    }
}; 