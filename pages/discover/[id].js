import Link from "next/link";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apolloClient";
import Products from "../../client/components/Products";
import { GET_CATEGORY } from "../../lib/queries";

const Discover = ({ id }) => {
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { id },
  });

  if (loading) return "Loading ...";
  if (error) return JSON.stringify(error);

  const { products } = data;

  return (
    <div className="pb-5">
      <div
        className="container py-5 px-5 d-flex justify-content-end"
        fluid="true"
      >
        <Link href="/categories">
          <u className="px-5" style={{ cursor: "pointer", fontSize: "1.5rem" }}>
            All Categories
          </u>
        </Link>
      </div>
      <Products products={products} />
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_CATEGORY,
    variables: { id },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id,
    },
  };
}

export default Discover;
