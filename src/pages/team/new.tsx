import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Screen from '../../components/Screen';
import ScreenSubtitle from '../../components/ScreenSubtitle';
import ScreenTitle from '../../components/ScreenTitle';
import Separator from '../../components/Separator';
import ShadowButton from '../../components/ShadowButton';
import ShadowButtonLabel from '../../components/ShadowButtonLabel';
import styles from './TeamCreationPage.module.scss'
import { GetServerSideProps } from 'next';
import { Player } from '../../app/repository/playerRepository';
import { Team } from '../../app/repository/teamRepository';
import { getSeasonDisplayName } from '../../helpers/getSeasonDisplayName';
import { useRouter } from 'next/router';

const TEAMS = ["bleu", "blanc", "rouge", "vert", "noir"]

export type props = {
  seasonId: string;
};

function PlayerEntry({
  playerName,
  index,
  update,
}: {
  playerName: string;
  index: number;
  update: (string, number) => void;
}) {
  return (
    <input
      className={styles.BasicInput}
      onChange={(e) => update(e.target.value, index)}
      value={playerName}
    ></input>
  );
}

export default function NewTeam({ seasonId }: props) {
  const router = useRouter();
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [name, setName] = useState<string>('');
  const [teamName, setTeamName] = useState<string>(TEAMS[0]);
  const [loading, setLoading] = useState<boolean>(false);
  const seasonDisplayName = getSeasonDisplayName(seasonId);

  const addPlayer = () => {
    const playerName = name;
    const newPlayer: Player = {
      name: playerName,
      id: '',
      alias: [playerName],
    };
    setPlayerList([...playerList, newPlayer]);
  };

  const updateName = (newName: string, index: number) => {
    playerList[index].name = newName;
    playerList[index].alias[0] = newName;
    setPlayerList([...playerList]);
  };

  const createTeam = async () => {
    setLoading(true);
    const createdPlayers = await Promise.all(
      playerList.map(async (p) => {
        const response = await fetch('/api/player', {
          method: 'POST',
          body: JSON.stringify(p),
        });
        if (response.ok) {
          return await response.json();
        }
        return null;
      })
    );

    const team: Team = {
      id: '',
      name: teamName,
      seasonId,
      iconPath: `/teamIcons/${teamName}.png`,
      playerIds: createdPlayers.map(p => p.id)
    };

    const response = await fetch('/api/team', {
      method: 'POST',
      body: JSON.stringify(team),
    });
    if(response.status == 200){
      const createdTeam =  await response.json() as Team;
      router.push(`/team/${createdTeam.id}`);
    }
  };

  const toTeam = (team: string) => {
    return (
      <div key={team} className={teamName == team ? styles.SelectedTeamImage : styles.TeamImage} onClick={() => setTeamName(team)}>
        <Image src={`/teamIcons/${team}.png`} alt={teamName} layout='fill' />
      </div>
    );
  };

  if (loading) {
    <Screen>
      <ScreenTitle title={seasonDisplayName} />
      <h2>Creating</h2>
      <Separator />
    </Screen>
  }

  return (
    <Screen>
      <ScreenTitle title={seasonDisplayName} />
      <ScreenSubtitle subtitle={'New Team'} />
      <div className={styles.TeamSelector}>
        {TEAMS.map(toTeam)}
      </div>
      <Separator />
      <h2>Players</h2>
      <Separator />
      <div className={styles.PlayerList}>
        {

          playerList.map((value, index) => (
            <PlayerEntry
              playerName={value.name}
              key={index}
              index={index}
              update={updateName}
            />
          ))
        }
      </div>
      <div className={styles.PlayerInputsContainer}>
        <input
          className={styles.BasicInput}
          placeholder="player name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <ShadowButtonLabel onClick={() => addPlayer()} label='Add' />
      </div>
      <Separator />
      <ShadowButton onClick={() => createTeam()}>Create</ShadowButton>
    </Screen >
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const seasonId = context.query.seasonId as string;
  return {
    props: {
      seasonId,
    },
  };
};
