import React from 'react';
import ShadowButtonlabel from './ShadowButtonlabel';
import styles from './MatchOrTeamSelector.module.scss';

export type props = {
    showMatches: boolean,
    setShowMatches: (showMatches: boolean) => void
};

export default function MatchOrTeamSelector({showMatches, setShowMatches}: props) {
  return (
    <div className={styles.MatchOrTeamSelector}>
      <ShadowButtonlabel selected={showMatches} label='Matches' onClick={() => setShowMatches(true)}/>
      <ShadowButtonlabel selected={!showMatches} label='Teams' onClick={() => setShowMatches(false)}/>
    </div>
  );
}
