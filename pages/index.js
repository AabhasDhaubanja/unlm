import { useQuery } from "@apollo/client";

import { initializeApollo } from "../lib/apolloClient";

import { INDEX_QUERY } from "../lib/queries";

import MyCarousel from "../client/components/index/MyCarousel";
import IndexFooter from "../client/components/index/IndexFooter";
import Products from "../client/components/Products";
import MyVideo from "../client/components/index/MyVideo";
import MenWomenKids from "../client/components/index/MenWomenKids";

const Home = () => {
  const { loading, error, data } = useQuery(INDEX_QUERY);

  if (loading) return "Loading ...";
  if (error) return JSON.stringify(error);

  const { arrivals } = data;

  const products = arrivals.map((arrival) => {
    return arrival.Product;
  });

  return (
    <div>
      <main>
        <MyCarousel />
        <Products
          title={
            <h4>
              <b>UNLM.</b> NEW ARRIVALS
            </h4>
          }
          products={products}
        />
        {/* <MenWomenKids /> */}
        <MyVideo />
        <IndexFooter />
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: INDEX_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Home;
