import React from 'react';
import Image from 'next/image';
import { Team } from '../app/repository/teamRepository';
import styles from './TeamsView.module.scss';
import { useRouter } from 'next/router';
import ShadowButton from './ShadowButton';

export type props = {
  teams: Team[];
  seasonId: string;
};

function CreateTean({ seasonId }: { seasonId: string }) {
  const router = useRouter();
  return (
    <ShadowButton onClick={() => router.push(`/team/new?seasonId=${seasonId}`)}>
      create team
    </ShadowButton>
  );
}

function TeamCard({ team }: { team: Team }) {
  const router = useRouter();
  const url = `/team/${team.id}`;
  console.log(url);
  return (
    <div className={styles.TeamCard} onClick={() => router.push(url)}>
      <div className={styles.TeamImage}>
        <Image src={team.iconPath} alt={team.name} layout="fill" />
      </div>
      <p>{team.name}</p>
    </div>
  );
}

export default function TeamsView({ teams, seasonId }: props) {
  return (
    <div className={styles.TeamsView}>
      <CreateTean seasonId={seasonId} />
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}
