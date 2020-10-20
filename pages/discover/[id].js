import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Container } from "react-bootstrap";
import { initializeApollo } from "../../lib/apolloClient";
import Products from "../../client/components/Products";
import { GET_CATEGORY } from "../../lib/queries";

const Discover = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { id },
  });

  if (loading) return "Loading ...";
  if (error) return JSON.stringify(error);

  const { products } = data;

  return (
    <div className="pb-5">
      <Container className="py-5 px-5 d-flex justify-content-end" fluid>
        <Link href="/categories">
          <u className="px-5" style={{ cursor: "pointer", fontSize: "1.5rem" }}>
            All Categories
          </u>
        </Link>
      </Container>
      <Products products={products} />
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
    query: GET_CATEGORY,
    variables: { id },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Discover;