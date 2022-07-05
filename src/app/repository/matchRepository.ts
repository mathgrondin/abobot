import { Match, MatchTeam} from "../../Types/collectionMap";
import { readCollection} from "../../../firebase/firestoreHelper";
import { epochToday, getCurrentSeasonId } from "../../helpers/epoch";
import { getTeamPlayersDisplayNames } from "./playerRepository";
// TODO: get this form db
export function getCurrentMatchData(): Promise<Match>{
    const currentMatchId = epochToday()
    const currentSeasonId = getCurrentSeasonId()
    console.log(currentMatchId)
    return Promise.resolve()
        .then(
            () => {
                return readCollection(currentSeasonId)
            })
        .then((collectionSnapshot) => {
            const matchsSnapshot = collectionSnapshot.docs.find(d => d.id === "matchs");
            if (matchsSnapshot) {
                const currentMatch : Match = matchsSnapshot.data()[currentMatchId]
                currentMatch.id = currentMatchId
                if (currentMatch){
                    return currentMatch
                }
            }
        })
}

export function getAllMatchIds(seasonId: string): Promise<string[]> {
    return Promise.resolve()
    .then(() => readCollection(seasonId))
    .then((collectionSnapshot) => collectionSnapshot.docs.find(d => d.id === "matchs"))
    .then((matchsSnapshot) => {
        const allMatchsIds = Object.keys(matchsSnapshot.data())
        return allMatchsIds
        
    })
}


export function getCurrentTeams(): Promise<string[]> {
    return Promise.resolve()
    .then(() => getCurrentMatchData())
    .then((currentMatch) => currentMatch.matchTeams)
    .then((matchTeams)=>{
        let teamsNames = []
        matchTeams.forEach((team)=> teamsNames.push(team.id))
        return teamsNames
    })

}



