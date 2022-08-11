export type Player = {
    id: string,
    name: string
}

const getPlayer = (playerId: string): Promise<Player | undefined> => {
    return undefined;
};

const createPlayer = (): Promise<Player | undefined> => {
    return undefined;
};

const updatePlayer = (): Promise<Player | undefined> => {
    return undefined;
};

const deletePlayer = (): Promise<Player | undefined> => {
    return undefined;
};

const PlayerWorkflow = {
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
};

export default PlayerWorkflow;