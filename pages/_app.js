import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

import Default from "../client/layouts/Default";
import { AuthProvider } from "../client/contexts/auth";

import "../client/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <div>
      <Head>
        <title>UNLM Offcial - The offical site for buying fancy clothes.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Default>
            <Component {...pageProps} />
          </Default>
        </ApolloProvider>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
