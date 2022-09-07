import { getDuplicateErrorMessage, getPlayerNotFoundMessage, getReply } from '../../helpers/replyHelper';
import { Match } from '../repository/matchRepository';
import { Player } from '../repository/playerRepository';
import { Team } from '../repository/teamRepository';
import PlayerWorkflow from '../workflow/playerWorkflow';
import TeamWorkflow from '../workflow/teamWorkflow';

function getPlayersByMatch(match: Match): Promise<Player[]> {
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
    });
}

function onNewMessage(match: Match, userId: string, message: string): Promise<string[]> {
  return getPlayersByMatch(match)
    .then(async (players: Player[]) => {
      const votedPlayer = players.find((p) =>
        p.alias.find(a => a === message)
      );
      if (votedPlayer) {
        return votedPlayer.id;
      }
      return undefined;
    })
    .then((playerId: string): string[] | undefined => {
      if (!playerId) {
        return [getPlayerNotFoundMessage()];
      }
      if (!match.messages[playerId]) {
        match.messages[playerId] = [];
      }
      const previousVotes = match.messages[userId];
      if (previousVotes.includes(playerId)) {
        return [getDuplicateErrorMessage()];
      }
      return [getReply(previousVotes.length), playerId];
    });
}

const VoteService = {
  onNewMessage
};

export default VoteService;