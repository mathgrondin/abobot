import React from 'react';
import ShadowButton from './ShadowButton';
import styles from './MatchOrTeamSelector.module.scss';

export type props = {
    showMatches: boolean,
    setShowMatches: (showMatches: boolean) => void
};

export default function MatchOrTeamSelector({showMatches, setShowMatches}: props) {
  return (
    <div className={styles.MatchOrTeamSelector}>
        <ShadowButton selected={showMatches} label='Matches' onClick={() => setShowMatches(true)}/>
        <ShadowButton selected={!showMatches} label='Teams' onClick={() => setShowMatches(false)}/>
    </div>
  );
}
