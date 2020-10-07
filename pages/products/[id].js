import { Container, Row, Col, Image } from "react-bootstrap";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apolloClient";

import { GET_PRODUCT } from "../../lib/queries";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });

  if (loading) return "Loading ...";
  if (error) return JSON.stringify(error);

  const { product } = data;

  return (
    <Container className="py-5 mt-5">
      <Row>
        <Col xs={6}>
          <Row>
            {product.Images.map(({ url }) => (
              <Col key={url} xs={12}>
                <Image
                  className="productImages"
                  src={`${process.env.NEXT_PUBLIC_SERVER}/${url}`}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={6}>
          <div className="productTitle">{product.name}</div>
          <div className="productPrice">$ {product.price}</div>
          <div className="productDescription">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </Col>
      </Row>
    </Container>
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
    },
  };
}

export default Product;
