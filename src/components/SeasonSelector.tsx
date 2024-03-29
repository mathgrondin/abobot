import { useRouter } from 'next/router';
import React from 'react';
import { Season } from '../app/repository/seasonRepository';
import { useGetAllSeasons } from '../hooks/useGetAllSeasons';
import styles from './SeasonSelector.module.scss';
import ShadowButtonLabel from './ShadowButtonLabel';

export default function SeasonSelector() {
  const { allSeasons, error, isLoading } = useGetAllSeasons();
  const router = useRouter();

  const getSeasonDisplay = (season: Season) =>
    season.id.slice(0, 4) + ' - ' + season.id.slice(4);

  return (
    <div className={styles.SeasonSelector}>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {allSeasons?.length > 0 && (
        <div className={styles.SeasonList}>
          {allSeasons
            .sort((a, b) => parseInt(b.id) - parseInt(a.id))
            .map((season) => (
              <ShadowButtonLabel
                key={season.id}
                label={getSeasonDisplay(season)}
                onClick={() => router.push(`/season/${season.id}`)}
              />
            ))}
        </div>
      )}
    </div>
  );
}
