import { getDuplicateErrorMessage, getPlayerNotFoundMessage, getReply } from '../../helpers/replyHelper';
import { Match } from '../repository/matchRepository';
import { Player } from '../repository/playerRepository';
import { Team } from '../repository/teamRepository';
import PlayerWorkflow from '../workflow/playerWorkflow';
import TeamWorkflow from '../workflow/teamWorkflow';
import FuzzySet from 'fuzzyset.js'

function getPlayersByMatch(match: Match): Promise<Player[]> {
  return Promise.resolve()
    .then(async () => {
      const teamA = await TeamWorkflow.getTeam(match.teamIds[0]);
      const teamB = await TeamWorkflow.getTeam(match.teamIds[1]);
      return [teamA, teamB];
    })
    .then(async ([teamA, teamB]: Team[]) => {
      const players = (await Promise.all([...teamA.playerIds, ...teamB.playerIds].map(async (playerId) =>
        await PlayerWorkflow.getPlayer(playerId) as Player
      )));
      return players;
    });
}

function onNewMessage(match: Match, userId: string, message: string): Promise<string[]> {
  return getPlayersByMatch(match)
    .then(async (players: Player[]) => {
      const votedPlayer = players.find((p) => p.alias.find(a => a.toLowerCase() === message.toLowerCase()))
      if (votedPlayer) {
        return votedPlayer.id;
      }
      return undefined;
    })
    .then((playerId: string | undefined) => {
      if (!playerId) {
        return [getPlayerNotFoundMessage()];
      }
      if (!match.messages[userId]) {
        match.messages[userId] = [];
      }
      const previousVotes = match.messages[userId];
      if (previousVotes.includes(playerId)) {
        return [getDuplicateErrorMessage()];
      }
      return [getReply(previousVotes.length), playerId];
    });
}

function onNewMessageTest(match: Match, message: string): Promise<string[]> {
  return getPlayersByMatch(match)
    .then(async (players: Player[]) => {
      const votedPlayer = findPlayerByMessage(players, message);
      if (votedPlayer) {
        return votedPlayer.id;
      }
      return undefined;
    })
    .then((playerId: string | undefined) => {
      if (!playerId) {
        return [getPlayerNotFoundMessage()];
      }
      return [getReply(0), playerId];
    });
}

function findPlayerByMessage(players: Player[], message: string) {
  const fuzzyPlayers = FuzzySet(players.map(p => p.name))
  const result = fuzzyPlayers.get(message);
  console.log("Match:", JSON.stringify(result))
  return players[0];
}

const VoteService = {
  onNewMessage,
  onNewMessageTest
};

export default VoteService;