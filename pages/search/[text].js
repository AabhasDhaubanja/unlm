import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

const Search = () => {
  const router = useRouter();
  const { text } = router.query;

  return (
    <div>
      <div>Search</div>
      <h1>{text}</h1>
    </div>
  );
};

export default Search;
