import React, { FunctionComponent, useState } from 'react';
import { getCurrentMatchId } from '../app/matchManager';
import style from './CreateMatch.module.scss';

type Props = {
}

type TeamSelectorProps = {
  teams: string[], 
  setTeams: (teams: string[]) => void
}

const TeamSelector: FunctionComponent<TeamSelectorProps> = () => {
  return (
    <p>Team selector</p>
  );
};

export const CreateMatch: FunctionComponent<Props> = ({ }) => {
  const currentMatchId = getCurrentMatchId();
  const [teams, setTeams] = useState<string[]>([]);
  return (
  <div className={style.CreateMatch}>
    <TeamSelector {...{setTeams, teams}}/>
  </div>
  );
};