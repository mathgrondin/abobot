import React from 'react';
import styles from './Screen.module.scss';

export default function Screen({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.Screen}>{children}</div>
  );
}
