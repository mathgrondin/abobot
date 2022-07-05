export type matchTeam = {
    id: string,
    score: Number,
    teamPenalty: Number
}

export type Match = {
    matchTeams: matchTeam[]
    messages: {
        [userId: string]: string[]
    }
}

export function getMatch(matchId: string): Promise<Match | undefined>{
    return Promise.resolve()
        .then()
}