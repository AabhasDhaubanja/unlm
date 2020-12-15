import Head from "next/head";
import AuthProvider from "../client/hocs/AuthProvider";
import Default from "../client/layouts/Default";
import "../client/styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>UNLM Offcial - The offical site for buying fancy clothes.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthProvider>
        <Default>
          <Component {...pageProps} />
        </Default>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
