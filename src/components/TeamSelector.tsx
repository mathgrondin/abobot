import Image from 'next/image';
import React from 'react';
import { Team } from '../app/repository/teamRepository';
import styles from './TeamSelector.module.scss';

export type props = {
  teams: Team[],
  setSelectedTeamId: (teadId: string) => void,
  selectedTeamId: string
}

export default function TeamSelector({teams, setSelectedTeamId, selectedTeamId}: props) {
  const toTeam = (team: Team) => {
    return (
      <div className={selectedTeamId == team.id ? styles.SelectedTeam : styles.Team} onClick={() => setSelectedTeamId(team.id)}>
        <Image src={team.iconPath} alt={team.name} layout='fill'/>
      </div>
    );
  };
  return (
    <div className={styles.TeamSelector}>
      {teams.map(toTeam)}
    </div>
  );
}
