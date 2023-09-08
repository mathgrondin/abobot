import { GetServerSideProps } from "next";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import Screen from "../../components/Screen";
import ScreenTitle from "../../components/ScreenTitle";
import { getSeasonDisplayName } from "../../helpers/getSeasonDisplayName";
import ScreenSubtitle from "../../components/ScreenSubtitle";
import { Player } from "../../app/repository/playerRepository";
import Separator from "../../components/Separator";
import ShadowButton from "../../components/ShadowButton";
import { useRouter } from "next/router";
import { Team } from "../../app/repository/teamRepository";

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
  update: Function;
}) {
  return (
    <input
      onChange={(e) => update(e.target.value, index)}
      value={playerName}
    ></input>
  );
}

export default function NewTeam({ seasonId }: props) {
  const router = useRouter();
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [name, setName] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const seasonDisplayName = getSeasonDisplayName(seasonId);

  const addPlayer = () => {
    console.log("playerName", name);
    const playerName = name;
    const newPlayer: Player = {
      name: playerName,
      id: undefined,
      alias: [playerName],
    };
    setPlayerList([...playerList, newPlayer]);
  };

  const updateName = (newName: string, index: number) => {
    playerList[index].name = newName;
    playerList[index].alias[0] = newName;
    console.log("new value", newName, playerList[index]);
    setPlayerList([...playerList]);
  };

  const createTeam = async () => {
    // setLoading(true);
    const createdPlayers = await Promise.all(
      playerList.map(async (p) => {
        console.log("Create p", p.name, JSON.stringify(p));
        const response = await fetch(`/api/player`, {
          method: "POST",
          body: JSON.stringify(p),
        })
        if(response.ok){
          return await response.json()
        }
        return null
      })
    )

    console.log("createdPlayers", createdPlayers)
    const team: Team = {
      id: "",
      name: teamName,
      seasonId,
      iconPath: "/teamIcons/blanc.png",
      playerIds: createdPlayers.map(p => p.id)
    }

    await fetch(`/api/team`, {
      method: "POST",
      body: JSON.stringify(team),
    })

    // if(response.ok){
    //   router.push(`/season/${seasonId}`);
    //   return;
    // }
    // const {message} = await response.json();
    // alert(message);
  };

  return (
    <Screen>
      <ScreenTitle title={seasonDisplayName} />
      <ScreenSubtitle subtitle={"New Team"} />
      <form>
        <input
          placeholder="Team name"
          onChange={(e) => setTeamName(e.target.value)}
        ></input>
      </form>
      <Separator />
      <h2>Players</h2>
      <Separator />
      {playerList.map((value, index) => (
        <PlayerEntry
          playerName={value.name}
          key={index}
          index={index}
          update={updateName}
        />
      ))}
      <div>
        <input
          placeholder="player name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button onClick={() => addPlayer()}>add</button>
      </div>
      <Separator />
      <ShadowButton onClick={() => createTeam()}>Create</ShadowButton>
    </Screen>
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
