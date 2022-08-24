import React from 'react';
import styles from './ScreenSubtitle.module.scss';

export type props = {
    subtitle: string
}

export default function ScreenSubtitle({subtitle}: props) {
  return (
    <h2 className={styles.ScreenSubtitle}>{subtitle}</h2>
  );
}
