import { gql } from "@apollo/client";

export const GET_SUPERCATEGORIES = gql`
  query {
    superCategories {
      id
      name
      Categories {
        id
        name
        superCategoryId
        SubCategories {
          id
          name
        }
      }
    }
  }
`;

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
