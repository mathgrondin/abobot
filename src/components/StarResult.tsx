import React from 'react';
import { Match } from '../app/repository/matchRepository';
import { Player } from '../app/repository/playerRepository';
import { Season } from '../app/repository/seasonRepository';
import { Team } from '../app/repository/teamRepository';
import styles from './StarResult.module.scss';

type props = {
  season: Season,
  match: Match,
  teams: Team[],
  players: Player[],
}

type Star = {
  id: string,
  name: string,
  score: number,
  team: string
}

const MAX_VOTE_COUNT = 1;

function compileVotes(match: Match, teams: Team[], players: Player[]): Star[] {
  const stars: Star[] = [];
  const { messages } = match;
  Object.values(messages).forEach(votes => {
    votes.forEach((v, i) => {
      // 3 votes max
      if (i > MAX_VOTE_COUNT) {
        return;
      }
      const playerCandidate = players.find(p => p.id === v);
      if (playerCandidate == null) {
        console.error(`"${v}" does not match any player`);
      }
      const player = playerCandidate as Player;
      const playerIndex = stars.findIndex(s => s.id === player.id);
      if (playerIndex < 0) {
        const team = teams.find(m => m.playerIds.includes(player.id)) as Team;
        stars.push({
          id: player.id,
          name: player.name,
          score: MAX_VOTE_COUNT - i,
          team: team.name
        });
      } else {
        stars[playerIndex].score += MAX_VOTE_COUNT - i;
      }
    });
  });
  return stars;
}

export default function StarResult({ match, teams, players }: props) {

  if (Object.keys(match.messages).length == 0) {
    return (
      <p>no votes yet</p>
    );
  }

  const stars = compileVotes(match, teams, players).sort((a, b) => b.score - a.score);

  const Star = ({ star }: { star: Star }) => {
    return (
      <div className={styles.Star}>
        <div className={styles[star.team]} />
        <p>{star.name} : {star.score}</p>
      </div>
    );
  };

  return (
    <div>{Object.values(stars).map((s) => <Star key={s.name} star={s} />)}</div>
  );
}
