import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { SEARCH_QUERY } from "../../lib/queries";

import Products from "../../client/components/Products";

const Search = () => {
  const router = useRouter();
  const { text } = router.query;
  console.log("text", text);

  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: { text },
  });

  if (loading) return "Loading ...";
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

export default Search;
