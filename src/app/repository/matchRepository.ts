import { readCollection, writeDocument } from "../../../firebase/firestoreHelper"

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

const MATCHS_COLLECTION_ID = "matchs"

function getMatch(matchId: string, seasonId: string): Promise<Match | undefined> {
    return Promise.resolve()
        .then(() => readCollection(MATCHS_COLLECTION_ID))
        .then(collectionSnapshot => {
            const matches = collectionSnapshot.docs.find(document => document.id === MATCHS_COLLECTION_ID);
            if(!matches){
                return undefined;
            }
            console.log("matches", matches.data());
            const match = matches.data()[matchId] as Match;
            console.log("match", match, "MatchId", matchId);
            return match;
        })
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
    }

    return Promise.resolve()
        .then(() => writeDocument(MATCHS_COLLECTION_ID, matchId, match))
        .then(() => match)
}

const MatchRepository = {
    getMatch,
    createMatch,
};

export default MatchRepository;