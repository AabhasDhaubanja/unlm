import { initializeApollo } from "../../lib/apolloClient";
import { useQuery } from "@apollo/client";
import { SEARCH_QUERY } from "../../lib/queries";
import Products from "../../client/components/Products";
import Loading from "../../client/components/Loading";

const Search = ({ text }) => {
  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: { text },
  });

  if (loading) return <Loading />;
  if (error) return JSON.stringify(error);

  const { search } = data;

  return (
    <div className="pb-5">
      <Products
        title={<h1>Showing search results for "{text}"</h1>}
        products={search}
      />
    </div>
  );
};

export async function getServerSideProps({ params: { text } }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SEARCH_QUERY,
    variables: { text },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      text,
    },
  };
}

export default Search;
