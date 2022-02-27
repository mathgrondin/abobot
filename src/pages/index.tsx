import Head from 'next/head';
import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { CreateMatch } from '../components/CreateMatch';

const fetcher = (url) => fetch(url).then((res) => res.json());
const environment = process.env.NODE_ENV || 'development';
const API = (environment === 'development' ? 'http://localhost:3000' : '') + "/api/getMatchs";

const IndexPage: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const { data } = useSWR(API, fetcher, { refreshInterval: 10 });

  useEffect(() => {
    if (!data) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading, data]);

  const Matches = () => {
    return (
      <div>
        {data?.matchIds.map((matchId, i) => <p key={matchId + i}>{matchId}</p>)}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Abbot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>matches</h1>
        <CreateMatch/>
        {loading ? <p>loading</p> : <Matches />}
      </div>
    </div>
  );
};

export default IndexPage;
