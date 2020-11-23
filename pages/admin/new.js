import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../../lib/queries";
import { nonAdmin } from "../../client/hocs/redirect";

const New = () => {
  const [addProduct] = useMutation(ADD_PRODUCT);

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

  const imageHandler = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid)
      setState({
        ...state,
        file,
      });
  };

  const createHandler = () => {
    addProduct({
      variables: {
        ...state,
        price: parseInt(state.price),
        categoryId: state.categoryId.toString(),
      },
      // context: {
      //   headers: {
      //     Authorization: accessToken ? `Bearer ${accessToken}` : "",
      //   },
      // },
    });
  };

  return (
    <Container className="py-5 mt-5">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          onChange={inputHandler}
          name="name"
          placeholder="Enter name"
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          placeholder="Enter Price"
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="number"
          name="categoryId"
          placeholder="Enter Category"
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          placeholder="Upload Images"
          onChange={imageHandler}
          required
        />
      </Form.Group>

      <Button variant="dark" type="submit" onClick={createHandler}>
        Create
      </Button>
    </Container>
  );
};

export default nonAdmin(New);
