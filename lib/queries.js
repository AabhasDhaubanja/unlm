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
        url
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
