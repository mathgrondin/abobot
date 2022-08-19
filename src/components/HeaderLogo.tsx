import Image from 'next/image';
import React from 'react';

export default function HeaderLogo() {
  return (
    <div>
        <Image src="/logo.png" alt="logo" width={128} height={128}/>
        <h1>Abobot</h1>
    </div>
  );
}
