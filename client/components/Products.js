import { Container, Row, Image } from "react-bootstrap";

const Products = ({ title, products }) => {
  console.log(products);
  return (
    <React.Fragment>
      <Container>
        <Row className="d-flex justify-content-center p-5 mt-5">
          <h4>{title}</h4>
        </Row>
      </Container>
      <div className="productGridContainer">
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
      </div>
    </React.Fragment>
  );
};

export default Products;
