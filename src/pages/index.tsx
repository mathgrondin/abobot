import Head from 'next/head';
import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());
const environment = process.env.NODE_ENV || 'development';
const API = (environment === 'development' ? 'http://localhost:3000' : '') + "/api/getMessages";
console.log('API', API);

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

  const Messages = () => {
    return (
      <div>
        {data?.messages.map((message, i) => <p key={message + i}>{message}</p>)}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Abobot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>messages</h1>
        {loading ? <p>loading</p> : <Messages />}
      </div>
    </div>
  );
};

export default IndexPage;
