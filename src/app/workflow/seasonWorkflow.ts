import { ApiError } from 'next/dist/server/api-utils';
import SeasonRepository, { Season } from '../repository/seasonRepository';
import { validateNewSeasonId } from '../validator/seasonValidator';

const SeasonRequestError_SeasonAlreadyExists = (seasonId: string) => new ApiError(400, `The following season already exists: ${seasonId}`);

const getSeason = (seasonId: string): Promise<Season | undefined> => {
    validateNewSeasonId(seasonId);
    return SeasonRepository.getSeason(seasonId);
};

const getAllSeasons = (): Promise<Season[]> => {
    return SeasonRepository.getAllSeasons();
};

const createSeason = (seasonId: string): Promise<Season | undefined> => {
    return Promise.resolve()
    .then(async () => {
        validateNewSeasonId(seasonId);
        const season = await getSeason(seasonId);
        if(season != null){
            throw SeasonRequestError_SeasonAlreadyExists(seasonId);
        }
        return SeasonRepository.createSeason(seasonId);
    });    
};

const updateSeason = (season: Season): Promise<Season | undefined> => {
    return SeasonRepository.updateSeason(season);
};

const deleteSeason = (): Promise<Season | undefined> => {
    return undefined;
};

const SeasonWorkflow = {
    getSeason,
    getAllSeasons,
    createSeason,
    updateSeason,
    deleteSeason,
};

export default SeasonWorkflow;
