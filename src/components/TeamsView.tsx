import React from 'react';
import { Team } from '../app/repository/teamRepository';

export type props = {
    teams: Team[]
}

export default function TeamsView({teams}: props) {
  return (
    <div>TeamsView</div>
  );
}
