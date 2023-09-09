import { readCollection, updateDocument, writeDocument } from '../../../firebase/firestoreHelper';

const SEASONS_COLLECTION_ID = 'seasons';

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
      if (!seasonSnapshot) {
        return undefined;
      }
      const season = seasonSnapshot.data() as Season;
      return season;
    });
}

function getAllSeasons(): Promise<Season[]> {
  console.log('Getting all seasons');
  return Promise.resolve()
    .then(() => readCollection(SEASONS_COLLECTION_ID))
    .then(collectionSnapshot => {
      console.log('Snapshot', collectionSnapshot.docs);
      return collectionSnapshot.docs.map(document => document.data() as Season);
    });
}

function updateSeason(season: Season): Promise<Season | undefined> {
  return Promise.resolve()
    .then(() => updateDocument(SEASONS_COLLECTION_ID, season.id, { ...season }))
    .then(() => season);
}

function createSeason(seasonId: string): Promise<Season | undefined> {
  const season: Season = {
    id: seasonId,
    matchIds: [],
    teamIds: []
  };

  return Promise.resolve()
    .then(() => writeDocument(SEASONS_COLLECTION_ID, seasonId, season))
    .then(() => season);
}

const SeasonRepository = {
  getSeason,
  getAllSeasons,
  updateSeason,
  createSeason,
};

export default SeasonRepository;