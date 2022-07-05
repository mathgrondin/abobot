import { Player} from "../../Types/collectionMap";
import { readCollection} from "../../../firebase/firestoreHelper";
import { getCurrentTeams } from "./matchRepository";
import { CurrentPlayers } from "../../Types/collectionMap";
import { current } from "@reduxjs/toolkit";
import { getCurrentSeasonId } from "../../helpers/epoch";

// TODO: get this form db
export function getPlayer(seasonId: string, playerId: string): Promise<Player>{
    return Promise.resolve()
        .then(() => (readCollection(seasonId)))
        .then((collectionSnapshot) => {
            const playersSnapshot = collectionSnapshot.docs.find(d => d.id === "players");
            if (playersSnapshot) {
                let player : Player = playersSnapshot.data()[playerId]
                player.id = playerId
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
            let player : Player = playersSnapshot.data()[playerId]
            player.id = playerId
            teamPlayers.push(
                player
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

export function getCurrentPlayers() : Promise<CurrentPlayers> {
    let currentPlayers = {} as CurrentPlayers
    let teams = []
    return Promise.resolve()
    .then(()=>getCurrentTeams())
    .then((currentTeams)=> {
        const seasonId = getCurrentSeasonId()
        teams = currentTeams
        let promises = []
        currentTeams.forEach((team) => {
            promises.push(getTeamPlayers(seasonId, team))
        })
        return promises
        
    }).then((promises)=> Promise.all(promises))
    
    .then((allTeamsPlayers) => {
        console.log(teams)
        allTeamsPlayers.forEach((teamPlayers, i) => {
        currentPlayers[teams[i]] = teamPlayers
        });
        return currentPlayers
    })
}





