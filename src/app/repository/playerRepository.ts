import { Player} from "../../Types/collectionMap";
import { readCollection} from "../../../firebase/firestoreHelper";
import { getCurrentTeams } from "./matchRepository";

// TODO: get this form db
export function getPlayer(seasonId: string, playerId: string): Promise<Player>{
    return Promise.resolve()
        .then(() => (readCollection(seasonId)))
        .then((collectionSnapshot) => {
            const playersSnapshot = collectionSnapshot.docs.find(d => d.id === "players");
            if (playersSnapshot) {
                const player : Player = playersSnapshot.data()[playerId]
                return player
            }

        })
}

export function getTeamPlayers(seasonId : string, teamId : string) : Promise<Player[]> {
    let teamPlayers = [] as Player[];
    let playerIds : string[] = [];
    return Promise.resolve()
    .then(() => readCollection(seasonId))
    .then((collectionSnapshot) => collectionSnapshot.docs.find(d => d.id ==="teams"))
    .then((teamsSnapshot) => {
        playerIds = teamsSnapshot.data()[teamId]["teamPlayers"];
        })
    .then(() => readCollection(seasonId))
    .then((collectionSnapshot)=> collectionSnapshot.docs.find(d => d.id === "players"))
    .then((playersSnapshot)=> {
        playerIds.forEach((playerId) => {
            teamPlayers.push(
                playersSnapshot.data()[playerId]
            )
        })
        return teamPlayers
    })
    }

export function getTeamPlayersDisplayNames(seasonId:string, teamId :string) : Promise<string[]> {
    return Promise.resolve()
    .then(() => getTeamPlayers(seasonId, teamId))
    .then((teamPlayers) => {
        let playersDisplayNames = [];
        teamPlayers.forEach((player) => playersDisplayNames.push(player.displayName))
        return playersDisplayNames

    })
}





