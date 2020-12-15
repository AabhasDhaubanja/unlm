import Link from "next/link";
import { useContext } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../client/hocs/AuthProvider";
import { initializeApollo } from "../../lib/apolloClient";
import { GET_PRODUCT_PAGE } from "../../lib/queries";
import Products from "../../client/components/Products";
import Loading from "../../client/components/Loading";

const Product = ({ id, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_PRODUCT_PAGE, {
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return JSON.stringify(error);

  const {
    productPage: { product, similar },
  } = data;

  if (!product) return <Loading />;

  return (
    <>
      <Container className="py-5 mt-5">
        <Row>
          <Col md={6} xs={12}>
            <Row>
              {product.Images.map(({ url }) => (
                <Col key={url} xs={12}>
                  <Image
                    className="productImages"
                    src={`${process.env.NEXT_PUBLIC_SERVER}/products_page/${url}`}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={6} xs={12}>
            <div className="productTitle">{product.name}</div>
            <div className="productPrice">$ {product.price}</div>
            <div className="py-5">
              {authContext &&
              authContext.user &&
              authContext.user.role &&
              authContext.user.role === "admin" ? (
                <Link href={`/admin/update/${product.id}`}>
                  <Button variant="dark">
                    <b>UPDATE PRODUCT</b>
                  </Button>
                </Link>
              ) : (
                <Link href="/comming">
                  <Button variant="dark">
                    <b>ADD TO CART</b>
                  </Button>
                </Link>
              )}
            </div>
            <div>
              <h4>DESCRIPTION</h4>
            </div>
            <div className="productDescription">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </Col>
        </Row>
      </Container>
      <Products
        title={
          <div className="h4">
            <b>SIMILAR.</b>
            <span> PRODUCTS</span>
          </div>
        }
        products={similar}
      />
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_PRODUCT_PAGE,
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
