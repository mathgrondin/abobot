import { GetServerSideProps } from 'next';
import React from 'react';
import TeamWorkflow from '../../app/workflow/teamWorkflow';
import Screen from '../../components/Screen';
import { Team } from '../../app/repository/teamRepository';
import SeasonWorkflow from '../../app/workflow/seasonWorkflow';
import { Season } from '../../app/repository/seasonRepository';
import { getSeasonDisplayName } from '../../helpers/getSeasonDisplayName';
import ScreenTitle from '../../components/ScreenTitle';
import Separator from '../../components/Separator';
import styles from './TeamPage.module.scss';
import Image from 'next/image';
import PlayerWorkflow from '../../app/workflow/playerWorkflow';
import { Player } from '../../app/repository/playerRepository';
import CreatePLayer from '../../components/CreatePLayer';

type props = {
  team: Team;
  season: Season;
  players: Player[];
};

function PlayerCard({ player }: { player: Player }) {
  return (
    <div className={styles.PlayerCard}>
      <p>{player.name}</p>
    </div>
  );
}

export default function TeamScreen({ team, season, players }: props) {
  return (
    <Screen>
      <Separator />
      <ScreenTitle
        title={`${team.name} (${getSeasonDisplayName(season.id)})`}
      />
      <div className={styles.TeamImage}>
        <Image src={team.iconPath} alt={team.name} layout="fill" />
      </div>
      <div className={styles.PlayerList}>
        <CreatePLayer />
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </Screen>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const teamId = (context.params?.teamId || '') as string;
  if (teamId) {
    const team = await TeamWorkflow.getTeam(teamId);
    if (team.id) {
      const season = await SeasonWorkflow.getSeason(team.seasonId);
      const players = await PlayerWorkflow.getPlayersByTeamId(teamId);

      return {
        props: {
          team,
          season,
          players,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};
