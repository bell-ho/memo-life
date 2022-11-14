import React, { useRef } from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const NodeBird = ({ Component, pageProps }) => {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <meta charSet="utf-8" />
          <title>Super-Cola</title>
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  // console.log(metric);
}

export default NodeBird;
