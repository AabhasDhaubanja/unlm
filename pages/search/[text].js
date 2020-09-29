import { useRouter } from "next/router";

const Search = () => {
  console.log("here");
  const router = useRouter();
  const { text } = router.query;
  console.log(text);

  return (
    <div>
      <div>Search</div>
      <h1>Search</h1>
    </div>
  );
};

export default Search;
