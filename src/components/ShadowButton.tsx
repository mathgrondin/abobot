import React, { ReactNode } from 'react';
import styles from './ShadowButton.module.scss';

export type props = {
    children: ReactNode
    selected?: boolean,
    onClick?: () => void
}

export default function ShadowButton({ selected, onClick, children }: props) {
  return (
    <button className={selected ? styles.SelectedShadowButton : styles.ShadowButton} onClick={onClick}>{children}</button>
  );
}
