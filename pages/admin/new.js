import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apolloClient";
import { GET_CATEGORIES, ADD_PRODUCT } from "../../lib/queries";
import { nonAdmin } from "../../client/hocs/redirect";

const New = () => {
  const [addProduct] = useMutation(ADD_PRODUCT);

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  // For the loading animation on create
  const [createLoading, setLoading] = useState(false);

  const [state, setState] = useState({
    name: "Default Product",
    price: 100,
    categoryId: "2",
  });

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

  const createHandler = async () => {
    setLoading(true);

    const product = await addProduct({
      variables: {
        ...state,
        price: parseInt(state.price),
        categoryId: state.categoryId.toString(),
      },
    });

    setLoading(false);

    window.location.href = "/discover/1";
  };

  // This is for the GraphQl Query GET_CATEGORIES
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // Removing the root category
  const { categories } = data;
  const cats = categories.filter((cat) => cat.isRoot !== true);

  return (
    <div className="container py-5 mt-5">
      <div className="mb-3">
        <label htmlFor="newProductName" className="form-label">
          Enter name
        </label>
        <input
          onChange={inputHandler}
          placeholder="Enter Name"
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
          placeholder="Enter Price"
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
        <select
          onChange={inputHandler}
          name="categoryId"
          className="form-select"
          aria-label="Default select example"
        >
          {cats.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="newProductImages" className="form-label">
          Images
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

      <button className="btn btn-dark" type="submit" onClick={createHandler}>
        {createLoading ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden"></span>
          </div>
        ) : (
          <span>Create</span>
        )}
      </button>
    </div>
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_CATEGORIES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default nonAdmin(New);
