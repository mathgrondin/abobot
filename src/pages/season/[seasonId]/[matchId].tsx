import MatchWorkflow from '../../../app/workflow/matchWorkflow';
import PlayerWorkflow from '../../../app/workflow/playerWorkflow';
import React from 'react';
import Screen from '../../../components/Screen';
import ScreenSubtitle from '../../../components/ScreenSubtitle';
import ScreenTitle from '../../../components/ScreenTitle';
import SeasonWorkflow from '../../../app/workflow/seasonWorkflow';
import Separator from '../../../components/Separator';
import StarResult from '../../../components/StarResult';
import TeamWorkflow from '../../../app/workflow/teamWorkflow';
import TeamsHeader from '../../../components/TeamsHeader';
import DeleteMatch from '../../../components/DeleteMatch';
import { GetServerSideProps } from 'next';
import { Match } from '../../../app/repository/matchRepository';
import { Player } from '../../../app/repository/playerRepository';
import { Season } from '../../../app/repository/seasonRepository';
import { Team } from '../../../app/repository/teamRepository';
import { getMatchDisplayName } from '../../../helpers/getMatchDisplayName';
import { getSeasonDisplayName } from '../../../helpers/getSeasonDisplayName';

type props = {
  season: Season,
  match: Match,
  teams: Team[],
  players: Player[]
}

export default function MatchScreen({ season, match, teams, players }: props) {
  return (
    <Screen>
      <div>
        <ScreenTitle title={getSeasonDisplayName(season.id)} />
        <ScreenSubtitle subtitle={getMatchDisplayName(match.id)} />
        <TeamsHeader teamA={teams[0]} teamB={teams[1]} />
        <Separator />
        <StarResult season={season} match={match} teams={teams} players={players} />
        <DeleteMatch seasonId={season.id} matchId={match.id}/>
      </div>
    </Screen>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const seasonId = (context.params?.seasonId || '') as string;
  const matchId = (context.params?.matchId || '') as string;
  const season = await SeasonWorkflow.getSeason(seasonId);
  const match = await MatchWorkflow.getMatch(parseInt(matchId));
  if (season && match) {
    const teams = (await Promise.all(match.teamIds.map(async teamId =>
      await TeamWorkflow.getTeam(teamId))
    )).filter((team) => !!team);

    const players = (await Promise.all(teams.map(async team => await PlayerWorkflow.getPlayersByTeamId(team.id)))).flat();
    
    if (teams.length == 2) {
      return {
        props: {
          season,
          match,
          teams,
          players
        },
      };
    }
  }
  return {
    notFound: true,
  };
};
