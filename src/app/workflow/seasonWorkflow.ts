import SeasonRepository, { Season } from "../repository/seasonRepository";

const getSeason = (seasonId: string): Promise<Season | undefined> => {
    return SeasonRepository.getSeason(seasonId);
}

const createSeason = (seasonId: string): Promise<Season | undefined> => {
    return SeasonRepository.createSeason(seasonId);
}

const updateSeason = (season: Season): Promise<Season | undefined> => {
    return SeasonRepository.updateSeason(season);
}

const deleteSeason = (): Promise<Season | undefined> => {
    return undefined;
}

const SeasonWorkflow = {
    getSeason,
    createSeason,
    updateSeason,
    deleteSeason,
}

export default SeasonWorkflow;
