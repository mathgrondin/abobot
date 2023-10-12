import FuzzySet from 'fuzzyset.js';
import PlayerWorkflow from '../workflow/playerWorkflow';
import TeamWorkflow from '../workflow/teamWorkflow';
import { Match } from '../repository/matchRepository';
import { Player } from '../repository/playerRepository';
import { Team } from '../repository/teamRepository';
import { getDuplicateErrorMessage, getPlayerNotFoundMessage, getReply } from '../../helpers/replyHelper';

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

function onNewMessage(match: Match, userId: string, message: string, useFuzzy = false): Promise<string[]> {
  console.log(' onNewMessage', userId, message);
  return getPlayersByMatch(match)
    .then(async (players: Player[]) => {
      let votedPlayer: Player | undefined = undefined;
      if (useFuzzy) {
        votedPlayer = findPlayerByFuzzyAlias(players, message);
      } else {
        votedPlayer = findPlayerByExcatAlias(players, message);
      }
      if (votedPlayer != undefined) {
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

function findPlayerByExcatAlias(players: Player[], alias: string): Player | undefined {
  return players.find((p) => p.alias.find(a => a.toLowerCase() === alias.toLowerCase()));
}

function findPlayerByFuzzyAlias(players: Player[], alias: string): Player | undefined {
  const fuzzyPlayers = FuzzySet(players.map(p => p.name));
  const result = fuzzyPlayers.get(alias);
  console.log('   result.length', result.length);
  if (result.length > 0) {
    const candidate = result.reduce(function (prev, current) {
      return (prev && prev[0] > current[0]) ? prev : current;
    });
    const [score, name] = candidate;
    console.log('     candidate:', name, score);
    if (score >= 0.60) {
      const player = players.find((p) => p.name === name);
      console.log('     player:', JSON.stringify(player));
      return player;
    }
  }
  return undefined;
}

function onNewMessageTest(match: Match, message: string): Promise<string[]> {
  return getPlayersByMatch(match)
    .then(async (players: Player[]) => {
      const votedPlayer = findPlayerByFuzzyAlias(players, message);
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

const VoteService = {
  onNewMessage,
  onNewMessageTest
};

export default VoteService;