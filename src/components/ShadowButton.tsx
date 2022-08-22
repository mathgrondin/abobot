import React from 'react';
import styles from './ShadowButton.module.scss';

export type props = {
  label: string,
  selected?: boolean,
  onClick?: () => void
}

export default function ShadowButton({ label, selected, onClick }: props) {
  return (
    <button className={selected ? styles.SelectedShadowButton: styles.ShadowButton} onClick={onClick}>{label}</button>
  );
}
