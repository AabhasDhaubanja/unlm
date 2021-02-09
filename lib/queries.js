import { gql } from "@apollo/client";

export const INDEX_QUERY = gql`
  query {
    arrivals {
      Product {
        id
        name
        price
        Images {
          url
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      name
      price
      Images {
        id
        url
      }
      categoryId
    }
  }
`;

export const GET_PRODUCT_PAGE = gql`
  query ProductPage($id: ID!) {
    productPage(id: $id) {
      product {
        id
        name
        price
        Images {
          url
        }
        categoryId
      }

      similar {
        id
        name
        price
        Images {
          url
        }
      }
    }
  }
`;

export const SEARCH_QUERY = gql`
  query Products($text: String!) {
    search(text: $text) {
      id
      name
      price
      Images {
        url
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      isRoot
      superId
    }
  }
`;

export const GET_CATEGORY = gql`
  query Category($id: ID!) {
    products(categoryId: $id) {
      id
      name
      price
      Images {
        url
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $price: Int!
    $categoryId: ID!
    $files: [Upload]
  ) {
    addProduct(
      name: $name
      price: $price
      categoryId: $categoryId
      files: $files
    ) {
      name
      price
      categoryId
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String!
    $price: Int!
    $categoryId: ID!
    $files: [Upload]
  ) {
    addProduct(
      id: $id
      name: $name
      price: $price
      categoryId: $categoryId
      files: $files
    ) {
      name
      price
      categoryId
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeleteImage($id: ID!) {
    deleteImage(id: $id) {
      status
      code
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      status
    }
  }
`;
