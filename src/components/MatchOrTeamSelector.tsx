import React from 'react';
import ShadowButtonLabel from './ShadowButtonLabel';
import styles from './MatchOrTeamSelector.module.scss';

export type props = {
    showMatches: boolean,
    setShowMatches: (showMatches: boolean) => void
};

export default function MatchOrTeamSelector({showMatches, setShowMatches}: props) {
  return (
    <div className={styles.MatchOrTeamSelector}>
      <ShadowButtonLabel selected={showMatches} label='Matches' onClick={() => setShowMatches(true)}/>
      <ShadowButtonLabel selected={!showMatches} label='Teams' onClick={() => setShowMatches(false)}/>
    </div>
  );
}
