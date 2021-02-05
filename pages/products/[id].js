import Link from "next/link";
import { useContext } from "react";
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
      <div className="container py-5 mt-5">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="row">
              {product.Images.map(({ url }) => (
                <div key={url} className="col-12">
                  <img
                    className="productImages"
                    src={`/products_page/${url}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="productTitle">{product.name}</div>
            <div className="productPrice">$ {product.price}</div>
            <div className="py-5">
              {authContext &&
              authContext.user &&
              authContext.user.role &&
              authContext.user.role === "admin" ? (
                <Link href={`/admin/update/${product.id}`}>
                  <button className="btn btn-dark">
                    <b>UPDATE PRODUCT</b>
                  </button>
                </Link>
              ) : (
                <Link href="/comming">
                  <button className="btn btn-dark">
                    <b>ADD TO CART</b>
                  </button>
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
          </div>
        </div>
      </div>
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
