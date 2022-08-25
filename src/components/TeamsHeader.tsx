import Image from 'next/image';
import React from 'react';
import { Team } from '../app/repository/teamRepository';
import styles from './TeamsHeader.module.scss';

export type props = {
  teamA: Team,
  teamB: Team
};

export default function TeamsHeader({teamA, teamB}: props) {
  return (
    <div className={styles.TeamsHeader}>
      <div className={styles.TeamBadge}>
        <Image src={teamA.iconPath} alt={teamA.name} layout='fill'/>
      </div>
      <h2>VS</h2>
      <div className={styles.TeamBadge}>
        <Image src={teamB.iconPath} alt={teamB.name} layout='fill'/>
      </div>
    </div>
  );
}
