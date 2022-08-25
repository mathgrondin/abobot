import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Season } from '../../app/repository/seasonRepository';
import { Team } from '../../app/repository/teamRepository';
import SeasonWorkflow from '../../app/workflow/seasonWorkflow';
import TeamWorkflow from '../../app/workflow/teamWorkflow';
import Screen from '../../components/Screen';
import ScreenSubtitle from '../../components/ScreenSubtitle';
import ScreenTitle from '../../components/ScreenTitle';
import Separator from '../../components/Separator';
import ShadowButtonlabel from '../../components/ShadowButtonlabel';
import TeamSelector from '../../components/TeamSelector';
import { getCurrentMatchId } from '../../helpers/getCurrentMatchId';
import { getSeasonDisplayName } from '../../helpers/getSeasonDisplayName';
import { getSeasonIdFromMatchId } from '../../helpers/getSeasonIdFromMatchId';
import styles from './new.module.scss';
import { useRouter } from 'next/router';

export type props = {
  season: Season,
  teams: Team[]
}

export default function NewMatch({ season, teams }: props) {
  const router = useRouter();
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [loading, setLoading] = useState(false);
  const matchId = getCurrentMatchId();
  const seasonId = getSeasonIdFromMatchId(matchId);
  const seasonDisplayName = getSeasonDisplayName({ id: seasonId } as Season);

  const validateTeamCandidate = (candidate: string, oppositeTeam: string, setFunction: (team: string) => void) => {
    if (candidate != oppositeTeam) {
      setFunction(candidate);
    }
  };

  const startMatch = async () => {
    if (!teamA || !teamB) {
      alert('Please select two teams');
      return;
    }
    setLoading(true);
    const response = await fetch(`/api/match?teamIds=${teamA},${teamB}`, { method: 'POST' });
    if(response.ok){
      router.push(`/season/${season.id}`);    
    }
    setLoading(false);    
    const {message} = await response.json();
    alert(message);    
  };

  return (
    <Screen>
      <div className={styles.NewMatch}>
        <ScreenTitle title={seasonDisplayName} />
        <ScreenSubtitle subtitle={'New Match'} />
        <Separator />
        {loading && <h2>Creating match...</h2>}
        {!loading && <>
          <TeamSelector teams={teams} setSelectedTeamId={(candidate: string) => validateTeamCandidate(candidate, teamB, setTeamA)} selectedTeamId={teamA} />
          <ScreenSubtitle subtitle={'VS'} />
          <TeamSelector teams={teams} setSelectedTeamId={(candidate: string) => validateTeamCandidate(candidate, teamA, setTeamB)} selectedTeamId={teamB} />
          <ShadowButtonlabel label='Start' onClick={startMatch} />
        </>}
      </div>
    </Screen>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const seasonId = context.query.seasonId as string;
  const season = await SeasonWorkflow.getSeason(seasonId);
  if (season) {
    const { teamIds } = season;
    const teams = await Promise.all(teamIds.map(async id =>
      await TeamWorkflow.getTeam(id))
    );
    return {
      props: {
        season,
        teams
      },
    };
  }
  return {
    notFound: true,
  };
};