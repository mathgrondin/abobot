import TeamRepository, { Team } from '../repository/teamRepository';
import { ValidateNewTeam } from '../validator/teamValidator';
import SeasonWorkflow from './seasonWorkflow';


const getTeam = (teamId: string): Promise<Team | undefined> => {
    return TeamRepository.getTeam(teamId);
};

const getTeamsByName = (teamId: string): Promise<Team[]> => {
    return TeamRepository.getTeamsByName(teamId);
};

const createTeam = (teamCandidate: Team): Promise<Team | undefined> => {
    return Promise.resolve()
        .then(async () => {
            await ValidateNewTeam(teamCandidate);
            const team = TeamRepository.createTeam(teamCandidate);
            return team;
        })
        .then(async (team) => {
            const season = await SeasonWorkflow.getSeason(team.seasonId);
            season.teamIds.push(team.id);
            await SeasonWorkflow.updateSeason(season);
            return team;
        })
        .then((team) => team);

};

const updateTeam = (): Promise<Team | undefined> => {
    return undefined;
};

const deleteTeam = (): Promise<Team | undefined> => {
    return undefined;
};

const TeamWorkflow = {
    getTeam,
    getTeamsByName,
    createTeam,
    updateTeam,
    deleteTeam,
};

export default TeamWorkflow;