import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import Default from "../client/layouts/Default";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import "../client/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <div>
      <Head>
        <title>UNLM Offcial - The offical site for buying fancy clothes.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Default>
            <Component {...pageProps} />
          </Default>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default MyApp;
