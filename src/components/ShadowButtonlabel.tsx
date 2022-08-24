import React from 'react';
import styles from './ShadowButtonlabel.module.scss';

export type props = {
  label: string,
  selected?: boolean,
  onClick?: () => void
}

export default function ShadowButtonlabel({ label, selected, onClick }: props) {
  return (
    <button className={selected ? styles.SelectedShadowButtonlabel: styles.ShadowButtonlabel} onClick={onClick}>{label}</button>
  );
}
