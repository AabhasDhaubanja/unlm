import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { nonAdmin } from "../../../client/hocs/redirect";
import { initializeApollo } from "../../../lib/apolloClient";
import {
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_IMAGE,
  DELETE_PRODUCT,
} from "../../../lib/queries";
import Loading from "../../../client/components/Loading";

const Update = ({ id, ...rest }) => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // The problem right now is that the state isn't set to the product values in the beginning
  // also fix the categories
  // and finally the image upload
  // :)
  const [state, setState] = useState({
    name: "Default Product",
    price: 100,
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [deleteImage] = useMutation(DELETE_IMAGE);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return JSON.stringify(error);

  const {
    product: { name, price, categoryId, Images },
  } = data;

  const inputHandler = ({ target: { value, name } }) => {
    let newState = { ...state };
    newState[name] = value;

    setState(newState);
  };

  const imageHandler = ({ target: { validity, files } }) => {
    if (validity.valid)
      setState({
        ...state,
        files,
      });
  };

  const updateHandler = async () => {
    if (confirm("Are you sure you want to update this product?")) {
      await updateProduct({
        variables: {
          ...state,
        },
      });
    }
  };

  const deleteImageHandler = async (imageId) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteImage({
        variables: {
          id: imageId,
        },
      });

      window.location.reload();
    }
  };
  const deleteHandler = async () => {
    setDeleteLoading(true);

    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct({
        variables: {
          id,
        },
      });
    }

    setDeleteLoading(false);

    window.location.href = "/discover/1";
  };

  return (
    <div className="container py-5 mt-5">
      <div className="mb-3">
        <label htmlFor="newProductName" className="form-label">
          Enter name
        </label>
        <input
          onChange={inputHandler}
          placeholder={name}
          name="name"
          type="text"
          className="form-control"
          id="newProductName"
          aria-describedby="productName"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="newProductPrice" className="form-label">
          Price
        </label>
        <input
          onChange={inputHandler}
          placeholder={price}
          name="price"
          type="number"
          className="form-control"
          id="newProductPrice"
          aria-describedby="productPrice"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="newProductCategory" className="form-label">
          Category
        </label>
        <input
          onChange={inputHandler}
          placeholder={categoryId}
          name="categoryId"
          type="number"
          className="form-control"
          id="newProductCategory"
          aria-describedby="productCategory"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="newProductImages" className="form-label">
          Add Images
        </label>
        <input
          type="file"
          placeholder="Upload Images"
          onChange={imageHandler}
          id="newProductImages"
          className="form-control"
          multiple
          required
        />
      </div>

      <div className="container py-5 px-0">
        <div className="row">
          <h4>Current Images</h4>
        </div>
        {Images.map(({ id, url }) => (
          <div key={id} className="row">
            <div className="col-6">
              <img
                src={`/products_page/${url}`}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="col-6 d-flex justify-content-center align-items-center">
              <button
                onClick={() => deleteImageHandler(id)}
                className="btn btn-danger ms-3"
              >
                Delete Image
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-dark" type="submit" onClick={updateHandler}>
        {updateLoading ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden"></span>
          </div>
        ) : (
          <span>Update</span>
        )}
      </button>
      <button onClick={deleteHandler} className="btn btn-danger ms-3">
        {deleteLoading ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden"></span>
          </div>
        ) : (
          <span>Delete Product</span>
        )}
      </button>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_PRODUCT,
    variables: { id },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id,
    },
  };
}

export default nonAdmin(Update);
