import Link from "next/link";

import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Products = ({ title, products }) => {
  console.log(products);
  return (
    <>
      {title ? (
        <Container>
          <Row className="d-flex justify-content-center p-5 mt-5">{title}</Row>
        </Container>
      ) : null}

      {products.length ? (
        <Container fluid>
          <Row>
            {products.map((product) => (
              <Col
                key={product.id}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                className="d-flex justify-content-center pb-5"
              >
                <Link href="/products/[id]" as={`/products/${product.id}`}>
                  <Card style={{ width: "18rem", cursor: "pointer" }}>
                    <div className="d-flex justify-content-center">
                      <Card.Img
                        variant="top"
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                        src={`/products_page${product.Images[0].url}`}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">View</Button>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <div
          style={{
            height: "40vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
            fontSize: "2rem",
            fontWeight: "600",
          }}
        >
          404 - Oops! No products found
        </div>
      )}
    </>
  );
};

export default Products;
