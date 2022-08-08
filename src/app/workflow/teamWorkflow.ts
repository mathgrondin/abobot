export type Team = {
    id: string,
    playersIds: string[]
}

const getTeam = (teamId: string): Promise<Team | undefined> => {
    return undefined;
}

const createTeam = (): Promise<Team | undefined> => {
    return undefined;
}

const updateTeam = (): Promise<Team | undefined> => {
    return undefined;
}

const deleteTeam = (): Promise<Team | undefined> => {
    return undefined;
}

const TeamWorkflow = {
    getTeam,
    createTeam,
    updateTeam,
    deleteTeam,
}

export default TeamWorkflow;