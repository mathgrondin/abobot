import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ShadowButtonlabel from './ShadowButtonlabel';

export default function CreateMatch() {
  const router = useRouter();
  
  return (
    <Link href={`/match/new?seasonId=${router.query.id}`} passHref>
      <ShadowButtonlabel label='New Match'/>
    </Link>
  );
}
