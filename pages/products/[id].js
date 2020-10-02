import {} from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apolloClient";

import { GET_PRODUCT } from "../../lib/queries";

const Product = ({ id }) => {
  const {
    data: { product },
  } = useQuery(GET_PRODUCT, { variables: { id } });

  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_PRODUCT,
    variables: { id },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id,
    },
  };
}

export default Product;
