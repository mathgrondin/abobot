import React from 'react';
import styles from './ScreenTitle.module.scss';

export type props = {
    title: string;
}

export default function ScreenTitle({ title }: props) {
  return (
    <div className={styles.ScreenTitle}>
      <h1>{title}</h1>
    </div>
  );
}
