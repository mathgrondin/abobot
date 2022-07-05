
import {Season} from "../../Types/collectionMap"
import { readCollection } from "../../../firebase/firestoreHelper"

export function getSeason(seasonId:string) :Promise<Season> {
    return Promise.resolve()
    .then( () => readCollection(seasonId))
    .then((collectionSnapshot) => {
        const matchsSnapshot = collectionSnapshot.docs.find(d => d.id === "matchs").data();
        const playersSnapshot = collectionSnapshot.docs.find(d => d.id === "players").data();
        const teamsSnapshot = collectionSnapshot.docs.find(d => d.id === "teams").data();
        const seasonData : Season = {
            matchs : matchsSnapshot,
            players : playersSnapshot,
            teams : teamsSnapshot
        }
        return seasonData
    })
}


