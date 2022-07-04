import { Player } from "../../Types/player.type";


// TODO: get this form db
export function getPlayer(playerId: string): Promise<Player>{
    return Promise.resolve()
        .then(() => ({
            id: "test",
            displayName: "test"
        }))
}