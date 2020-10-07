import Link from "next/link";

import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Products = ({ title, products }) => {
  return (
    <React.Fragment>
      <Container>
        <Row className="d-flex justify-content-center p-5 mt-5">{title}</Row>
      </Container>
      {/* <div className="productGridContainer">
        {products.map((product) => (
          <div className="productCard" key={product.name}>
            <div>
              <Image
                style={{ height: "220px", width: "auto" }}
                src={`${process.env.NEXT_PUBLIC_SERVER}${product.Images[0].url}`}
              />
              <div className="py-4">
                <div style={{ fontWeight: 900 }}>{product.name}</div>
                <div>Rs. {product.price} + Tax</div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <Container fluid>
        <Row>
          {products.map((product) => (
            <Col
              key={product.id}
              xs={3}
              className="d-flex justify-content-center"
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
                      src={`${process.env.NEXT_PUBLIC_SERVER}${product.Images[0].url}`}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
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
