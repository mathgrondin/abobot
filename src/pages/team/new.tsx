import { GetServerSideProps } from 'next';
import React from 'react';
import Screen from '../../components/Screen';
import ScreenTitle from '../../components/ScreenTitle';
import { getSeasonDisplayName } from '../../helpers/getSeasonDisplayName';
import ScreenSubtitle from '../../components/ScreenSubtitle';

export type props = {
  seasonId: string;
};

export default function NewTeam({ seasonId }: props) {
  const seasonDisplayName = getSeasonDisplayName(seasonId);

  return (
    <Screen>
      <ScreenTitle title={seasonDisplayName} />
      <ScreenSubtitle subtitle={'New Team'} />
      <form>
        <div>
          <p>Name</p>
          <input></input>
        </div>
      </form>
    </Screen>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const seasonId = context.query.seasonId as string;
  return {
    props: {
      seasonId,
    },
  };
};
