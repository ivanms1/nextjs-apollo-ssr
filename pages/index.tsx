import Head from 'next/head';
import { useQuery } from '@apollo/client';
import type { GetStaticProps } from 'next';

import QUERY_COUNTRIES from './queryCountries.graphql';

import { addApolloState, initializeApollo } from '../apollo';

import styles from '../styles/Home.module.css';

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_COUNTRIES);

  // check for errors
  if (error) {
    return <p>:( an error happened</p>;
  }

  // if all good return data
  return (
    <div className={styles.container}>
      <Head>
        <title>Countries GraphQL</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Countries</h1>
      {/* let the user know we are fetching the countries */}
      {loading && <p>loading...</p>}
      <div>
        {data?.countries?.map((country) => (
          <div key={country.code}>{country.name}</div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const client = initializeApollo();

  await client.query({
    query: QUERY_COUNTRIES,
  });

  return addApolloState(client, {
    props: {},
  });
};
