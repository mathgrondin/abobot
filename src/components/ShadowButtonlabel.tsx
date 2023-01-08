import React from 'react';
import styles from './ShadowButtonLabel.module.scss';

export type props = {
  label: string,
  selected?: boolean,
  disabled?: boolean,
  onClick?: () => void
}

export default function ShadowButtonLabel({ label, selected, disabled, onClick }: props) {
  return (
    <button className={selected ? styles.SelectedShadowButtonLabel: styles.ShadowButtonLabel} onClick={onClick} disabled={disabled}>{label}</button>
  );
}
