import Link from "next/link";

import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Products = ({ title, products }) => {
  return (
    <React.Fragment>
      {title ? (
        <Container>
          <Row className="d-flex justify-content-center p-5 mt-5">{title}</Row>
        </Container>
      ) : null}
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
              <Link
                href="/products/[id]"
                as={`${process.env.NEXT_PUBLIC_SERVER}/products/${product.id}`}
              >
                <Card style={{ width: "18rem", cursor: "pointer" }}>
                  <div className="d-flex justify-content-center">
                    <Card.Img
                      variant="top"
                      style={{
                        height: 220,
                        width: "auto",
                      }}
                      src={`${process.env.NEXT_PUBLIC_SERVER}/products_page/${product.Images[0].url}`}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Products;
