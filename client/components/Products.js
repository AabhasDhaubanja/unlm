import Link from "next/link";

const Products = ({ title, products }) => {
  return (
    <>
      {title ? (
        <div className="container">
          <div className="row justify-content-center p-5 mt-5">{title}</div>
        </div>
      ) : null}

      {products.length ? (
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center pb-5"
              >
                <Link href="/products/[id]" as={`/products/${product.id}`}>
                  <div
                    className="card"
                    style={{ width: "18rem", cursor: "pointer" }}
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                        src={`/products_page${product.Images[0].url}`}
                      />
                    </div>
                    <div className="card-body">
                      <div className="card-title">{product.name}</div>
                      <div className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </div>
                      <button className="btn btn-primary">View</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
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
