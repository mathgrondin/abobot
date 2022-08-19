import React, { useEffect, useState } from 'react';
import { Season } from '../app/repository/seasonRepository';
import { useGetAllSeasons } from '../hooks/useGetAllSeasons';
import styles from './SeasonSelector.module.scss';
import ShadowButton from './ShadowButton';

export default function SeasonSelector() {
  const { allSeasons, error, isLoading } = useGetAllSeasons();

  const getSeasonDisplay = (season: Season) => season.id.slice(0, 4) + ' - ' + season.id.slice(4);

  return (
    <div className={styles.SeasonSelector}>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {allSeasons?.length > 0 &&
        <div>{allSeasons.map(season =>
          <ShadowButton key={season.id} label={getSeasonDisplay(season)}/>)}
        </div>
      }
    </div>
  );
}
