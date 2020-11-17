import Link from "next/link";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { checkAuth } from "../../client/hocs/checkAuth";
import { GET_PRODUCT, GET_CATEGORY } from "../../lib/queries";
import Products from "../../client/components/Products";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });

  if (loading) return "Loading ...";
  if (error) return JSON.stringify(error);

  const { product } = data;
  const {
    loading: loadingS,
    error: errorS,
    data: dataS,
  } = useQuery(GET_CATEGORY, { variables: { id: product.categoryId } });

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
              <Link href="/comming">
                <Button variant="dark">
                  <b>ADD TO CART</b>
                </Button>
              </Link>
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
      {!errorS && !loadingS && dataS ? (
        <Products
          title={
            <div className="h4">
              <b>SIMILAR.</b>
              <span> PRODUCTS</span>
            </div>
          }
          products={dataS.products}
        />
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export const getServerSideProps = checkAuth(GET_PRODUCT);

export default Product;
