import React from 'react';
import type { NextPage } from 'next';
import HeaderLogo from '../components/HeaderLogo';
import SeasonSelector from '../components/SeasonSelector';
import Screen from '../components/Screen';



const IndexPage: NextPage = () => {
  return (
    <Screen>
      <HeaderLogo />
      <SeasonSelector />
    </Screen>
  );
};

export default IndexPage;
