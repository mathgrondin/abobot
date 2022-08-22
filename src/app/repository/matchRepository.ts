import { readCollection, updateDocument, writeDocument } from '../../../firebase/firestoreHelper';

export type Match = {
    id: string
    teamIds: string[],
    score: {
        teamA: number,
        teamB: number,
    },
    messages: {
        [userId: string]: string[]
    }
}

const MATCHS_COLLECTION_ID = 'matchs';

function getMatch(matchId: string): Promise<Match | undefined> {
    return Promise.resolve()
        .then(() => readCollection(MATCHS_COLLECTION_ID))
        .then(collectionSnapshot => {
            const matchSnapshot = collectionSnapshot.docs.find(document => document.id === matchId);
            if(!matchSnapshot){
                return undefined;
            }
            const match = matchSnapshot.data() as Match;
            return match;
        });
}

function createMatch(matchId: string, teamIds: string[]): Promise<Match | undefined> {
    const match: Match = {
        id: matchId,
        teamIds,
        score: {
            teamA: 0,
            teamB: 0,
        },
        messages: {}
    };

    return Promise.resolve()
        .then(() => writeDocument(MATCHS_COLLECTION_ID, matchId, match))
        .then(() => match);
}

function updateMatch(match: Match): Promise<Match | undefined> {
    return Promise.resolve()
        .then(() => updateDocument(MATCHS_COLLECTION_ID, match.id, {...match}))
        .then(() => match);
}

const MatchRepository = {
    getMatch,
    createMatch,
    updateMatch
};

export default MatchRepository;