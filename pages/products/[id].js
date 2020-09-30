import { useRouter } from "next/router";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apolloClient";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  const GET_PRODUCT = gql`
query {
  product(id: ${id}) {
    id
    name
		price
    Images {
      url
    }
  }
}`;

  const { data } = useQuery(GET_PRODUCT);
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const router = useRouter();

  const { id } = router.query();

  const GET_PRODUCT = gql`
query {
  product(id: ${id}) {
    id
    name
		price
    Images {
      url
    }
  }
}`;

  await apolloClient.query({
    query: GET_PRODUCT,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Product;
