import { readCollection, writeDoc } from "../../../firebase/firestoreHelper";

const SEASONS_COLLECTION_ID = "seasons";

export type Season = {
    id: string,
    matchIds: string[],
    teamIds: string[],
}

function getSeason(seasonId: string): Promise<Season | undefined> {
    return Promise.resolve()
        .then(() => readCollection(SEASONS_COLLECTION_ID))
        .then(collectionSnapshot => {
            const seasonSnapshot = collectionSnapshot.docs.find(document => document.id === seasonId);
            if(!seasonSnapshot){
                return undefined;
            }
            console.log("seasonSnapshot", seasonSnapshot.data());
            const season = seasonSnapshot.data() as Season;
            console.log("season", season, "seasonId", season.id);
            return season;
        })
}

function createSeason(seasonId: string): Promise<Season | undefined> {
    const season: Season = {
        id: seasonId,
        matchIds: [],
        teamIds: []
    }

    return Promise.resolve()
        .then(() => writeDoc(SEASONS_COLLECTION_ID, {[seasonId]: season}))
        .then(() => season)
}

const SeasonRepository = {
    createSeason,
    getSeason,
}

export default SeasonRepository;