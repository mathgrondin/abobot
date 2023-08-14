import MatchList from "../../components/MatchList";
import MatchOrTeamSelector from "../../components/MatchOrTeamSelector";
import MatchWorkflow from "../../app/workflow/matchWorkflow";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import SeasonWorkflow from "../../app/workflow/seasonWorkflow";
import Separator from "../../components/Separator";
import TeamWorkflow from "../../app/workflow/teamWorkflow";
import TeamsView from "../../components/TeamsView";
import { GetServerSideProps } from "next";
import { Match } from "../../app/repository/matchRepository";
import { Season } from "../../app/repository/seasonRepository";
import { Team } from "../../app/repository/teamRepository";
import { getSeasonDisplayName } from "../../helpers/getSeasonDisplayName";
import ScreenTitle from "../../components/ScreenTitle";

type props = {
  season: Season;
  matches: Match[];
  teams: Team[];
};

export default function SeasonScreen({ season, matches, teams }: props) {
  const [showMatches, setShowMatches] = useState(true);
  const seasonDisplayName = getSeasonDisplayName(season.id);

  return (
    <Screen>
      <ScreenTitle title={seasonDisplayName} />
      <div>
        <MatchOrTeamSelector
          showMatches={showMatches}
          setShowMatches={setShowMatches}
        />
        <Separator />
        {showMatches && (
          <MatchList matches={matches} teams={teams} seasonId={season.id} />
        )}
        {!showMatches && <TeamsView teams={teams} seasonId={season.id} />}
      </div>
    </Screen>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const seasonId = context.params.seasonId as string;
  const season = await SeasonWorkflow.getSeason(seasonId);
  if (season) {
    const { matchIds, teamIds } = season;
    const matches = (
      await Promise.all(
        matchIds.map(
          async (matchId) => await MatchWorkflow.getMatch(parseInt(matchId))
        )
      )
    ).filter((match) => !!match);
    const teams = (
      await Promise.all(
        teamIds.map(async (teamId) => await TeamWorkflow.getTeam(teamId))
      )
    ).filter((team) => !!team);
    return {
      props: {
        season,
        matches,
        teams,
      },
    };
  }
  return {
    notFound: true,
  };
};
