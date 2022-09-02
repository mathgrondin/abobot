import { Match } from '../repository/matchRepository';
import { Player } from '../repository/playerRepository';
import { Team } from '../repository/teamRepository';
import PlayerWorkflow from '../workflow/playerWorkflow';
import TeamWorkflow from '../workflow/teamWorkflow';

function processMessage(match: Match, userId: string, message: string): Promise<string | undefined> {
  return Promise.resolve()
    .then(async () => {
      const teamA = await TeamWorkflow.getTeam(match.teamIds[0]);
      const teamB = await TeamWorkflow.getTeam(match.teamIds[1]);
      return [teamA, teamB];
    })
    .then(async ([teamA, teamB]: Team[]) => {
      const players = (await Promise.all([...teamA.playerIds, ...teamB.playerIds].map(async (playerId) => 
        await PlayerWorkflow.getPlayer(playerId)
      )));
      return players;
    })
    .then(async (players: Player[]) => {
      const votedPlayer = players.find((p) => p.name === message);
      if(votedPlayer){
        return 'next vote plz';
      }
      return undefined;
    });
}

const VoteService = {
  processMessage
};

export default VoteService;