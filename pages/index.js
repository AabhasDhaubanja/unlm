import { useQuery } from "@apollo/client";

import { initializeApollo } from "../lib/apolloClient";

import { INDEX_QUERY } from "../lib/queries";

import MyCarousel from "../client/components/index/MyCarousel";
import IndexFooter from "../client/components/index/IndexFooter";
import Products from "../client/components/Products";
import MenWomenKids from "../client/components/index/MenWomenKids";

const Home = () => {
  const {
    data: { arrivals },
  } = useQuery(INDEX_QUERY);

  const products = arrivals.map((arrival) => {
    return arrival.Product;
  });

  return (
    <div>
      <main>
        <MyCarousel />
        <Products
          title={
            <span>
              <b>UNLM.</b> NEW ARRIVALS
            </span>
          }
          products={products}
        />
        <MenWomenKids />
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
