import { Container } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient";
import { GET_SUPERCATEGORIES } from "../lib/queries";

import CategoryMenu from "../components/categories/CategoryMenu";

const Categories = () => {
  const {
    data: { superCategories },
  } = useQuery(GET_SUPERCATEGORIES);

  return (
    <div style={{ height: "100vh" }} className="bg-dark text-white pt-5">
      <Container className="pt-5">
        <CategoryMenu superCategories={superCategories} />
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_SUPERCATEGORIES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Categories;
