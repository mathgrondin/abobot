
export type Season = {
    matchs : Matchs,
    players : Players,
    teams : Teams
}

export interface Players {
    [playerId:string] : Player
}

export interface Player {
    id: string;
    displayName: string;
    penalty: number;
    jersey: number;
}
export interface Teams {
    [teamId:string] : Team;
}

export interface Team {
    stats: TeamStats;
    teamPlayers: TeamPlayers;
}

export interface TeamStats {
    draw: number;
    lost: number;
    wins: number;
    teamPenalty: number;
}

export type TeamPlayers = PlayerId[]

export type PlayerId = string

export interface Match {
    id: string;
    messages: Messages;
    referee: string;
    matchTeams: MatchTeam[]
}

export interface Matchs {
    [matchId:string] : Match
}

export interface Messages {
    [userId:string] : []
}

export interface MatchTeam {
    id: string;
    score: number;
    teamPenalty: number;
}





