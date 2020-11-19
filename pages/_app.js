import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import Default from "../client/layouts/Default";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import "../client/styles/globals.scss";
import Loading from "../client/components/Loading";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  let [apolloClient, setApolloClient] = React.useState(null);

  React.useEffect(() => {
    const temp = useApollo(pageProps.initialApolloState);
    setApolloClient(temp);
  }, []);

  return (
    <div>
      <Head>
        <title>UNLM Offcial - The offical site for buying fancy clothes.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {apolloClient ? (
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            <Default>
              <Component {...pageProps} />
            </Default>
          </ApolloProvider>
        </Provider>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default MyApp;
