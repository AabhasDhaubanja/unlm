import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import Default from "../client/layouts/Default";
import CheckAuth from "../client/hocs/CheckAuth";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import "../client/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <div>
      <Head>
        <title>UNLM Offcial - The offical site for buying fancy clothes.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <CheckAuth>
          <ApolloProvider client={apolloClient}>
            <Default>
              <Component {...pageProps} />
            </Default>
          </ApolloProvider>
        </CheckAuth>
      </Provider>
    </div>
  );
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(MyApp);
