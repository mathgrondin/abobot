import MatchWorkflow from '../../../app/workflow/matchWorkflow';
import React from 'react';
import Screen from '../../../components/Screen';
import ScreenSubtitle from '../../../components/ScreenSubtitle';
import ScreenTitle from '../../../components/ScreenTitle';
import SeasonWorkflow from '../../../app/workflow/seasonWorkflow';
import Separator from '../../../components/Separator';
import TeamWorkflow from '../../../app/workflow/teamWorkflow';
import TeamsHeader from '../../../components/TeamsHeader';
import { GetServerSideProps } from 'next';
import { Match } from '../../../app/repository/matchRepository';
import { Season } from '../../../app/repository/seasonRepository';
import { Team } from '../../../app/repository/teamRepository';
import { getMatchDisplayName } from '../../../helpers/getMatchDisplayName';
import { getSeasonDisplayName } from '../../../helpers/getSeasonDisplayName';

type props = {
  season: Season,
  match: Match,
  teams: Team[]
}

export default function MatchScreen({ season, match, teams}: props) {

  return (
    <Screen>
      <div>
        <ScreenTitle title={getSeasonDisplayName(season.id)} />
        <ScreenSubtitle subtitle={getMatchDisplayName(match.id)} />
        <Separator />
        <TeamsHeader teamA={teams[0]} teamB={teams[1]}/>
      </div>
    </Screen>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const seasonId = context.params.seasonId as string;
  const matchId = context.params.matchId as string;
  const season = await SeasonWorkflow.getSeason(seasonId);
  const match = await MatchWorkflow.getMatch(parseInt(matchId));
  if (season && match) {
    const teams = (await Promise.all(match.teamIds.map(async teamId =>
      await TeamWorkflow.getTeam(teamId))
    )).filter((team) => !!team);
    if(teams.length == 2){
      return {
        props: {
          season,
          match,
          teams
        },
      };
    }
  }
  return {
    notFound: true,
  };
};
