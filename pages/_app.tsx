import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import useApollo from '../hooks/useApollo';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
