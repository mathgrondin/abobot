import MatchList from '../../components/MatchList';
import MatchOrTeamSelector from '../../components/MatchOrTeamSelector';
import MatchWorkflow from '../../app/workflow/matchWorkflow';
import React, { useState } from 'react';
import Screen from '../../components/Screen';
import SeasonWorkflow from '../../app/workflow/seasonWorkflow';
import Separator from '../../components/Separator';
import TeamWorkflow from '../../app/workflow/teamWorkflow';
import TeamsView from '../../components/TeamsView';
import { GetServerSideProps } from 'next';
import { Match } from '../../app/repository/matchRepository';
import { Season } from '../../app/repository/seasonRepository';
import { Team } from '../../app/repository/teamRepository';
import { getSeasonDisplayName } from '../../helpers/getSeasonDisplayName';
import ScreenTitle from '../../components/ScreenTitle';

type props = {
    season: Season,
    matches: Match[],
    teams: Team[]
}

export default function SeasonScreen({ season, matches, teams }: props) {
  const [showMatches, setShowMatches] = useState(true);
  const seasonDisplayName = getSeasonDisplayName(season);

  return (
    <Screen>
      <ScreenTitle title={seasonDisplayName} />
      <div>
        <MatchOrTeamSelector showMatches={showMatches} setShowMatches={setShowMatches} />
        <Separator />
        {showMatches && <MatchList matches={matches} teams={teams} />}
        {!showMatches && <TeamsView teams={teams} />}
      </div>
    </Screen>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id as string;
  const season = await SeasonWorkflow.getSeason(id);
  if (season) {
    const { matchIds, teamIds } = season;
    const matches = (await Promise.all(matchIds.map(async id =>
      await MatchWorkflow.getMatch(parseInt(id)))
    )).filter((match) => !!match);
    const teams = (await Promise.all(teamIds.map(async id =>
      await TeamWorkflow.getTeam(id))
    )).filter((team) => !!team);
    return {
      props: {
        season,
        matches,
        teams
      },
    };
  }
  return {
    notFound: true,
  };
};