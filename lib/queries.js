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

// export cont
