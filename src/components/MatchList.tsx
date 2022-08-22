import React from 'react';
import { Match } from '../app/repository/matchRepository';
import { Team } from '../app/repository/teamRepository';
import { getMatchDisplayName } from '../helpers/getMatchDisplayName';
import styles from './MatchList.module.scss';

export type props = {
  matches: Match[],
  teams: Team[]
}

export default function MatchList({ matches, teams }: props) {
  const MatchCard = ({ match }: { match: Match }) => {
    const team1 = teams.find(team => team.id === match.teamIds[0]);
    const team2 = teams.find(team => team.id === match.teamIds[1]);
    return (
      <div className={styles.MatchCard}>
        <p>{getMatchDisplayName(match.id)}</p>
        <div className={styles['MatchCardTeam' + team1.name]}/>
        <div className={styles['MatchCardTeam' + team2.name]}/>
      </div>
    );
  };

  return (
    <div className={styles.MatchList}>
      {matches.map(match => <MatchCard key={match.id} match={match} />)}
    </div>
  );
}
