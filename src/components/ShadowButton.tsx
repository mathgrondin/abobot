import React from 'react';
import styles from './ShadowButton.module.scss';

export default function ShadowButton({label, onClick}: {label: string ,onClick?: () => void}) {
  return (
    <button className={styles.ShadowButton} onClick={onClick}>{label}</button>
  );
}
