import React from 'react';
import ShadowButtonLabel from './ShadowButtonLabel';
import styles from './MatchList.module.scss';
import { Match } from '../app/repository/matchRepository';
import { Team } from '../app/repository/teamRepository';
import { getMatchDisplayName } from '../helpers/getMatchDisplayName';
import { useRouter } from 'next/router';

export type props = {
  matches: Match[],
  teams: Team[]
  seasonId: string,
}

export default function MatchList({ matches, teams, seasonId }: props) {
  const router = useRouter();
  const MatchCard = ({ match }: { match: Match }) => {
    const team1 = teams.find(team => team.id === match.teamIds[0]);
    const team2 = teams.find(team => team.id === match.teamIds[1]);
    return (
      <div className={styles.MatchCard} onClick={() => router.push(`${seasonId}/${match.id}`)}>
        <p>{getMatchDisplayName(match.id)}</p>
        <div className={styles['MatchCardTeam' + team1.name]} />
        <div className={styles['MatchCardTeam' + team2.name]} />
      </div>
    );
  };
  
  const CreateMatch = () => <ShadowButtonLabel label='New Match' onClick={() => router.push(`/match/new?seasonId=${seasonId}`)}/>;
  
  // sort by date descending
  matches.sort((a,b) => parseInt(b.id) - parseInt(a.id));

  return (
    <div className={styles.MatchList}>
      <CreateMatch />
      {matches.map(match => <MatchCard key={match.id} match={match} />)}
    </div>
  );
}
