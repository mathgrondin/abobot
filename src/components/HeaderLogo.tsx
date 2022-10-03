import Image from 'next/image';
import React from 'react';
import styles from './HeaderLogo.module.scss';

export default function HeaderLogo() {
  return (
    <div className={styles.HeaderLogo}>
      <Image src="/logo.png" alt="logo" width={128} height={128}/>
      <h1 className={styles.Title}>Abobot</h1>
    </div>
  );
}
