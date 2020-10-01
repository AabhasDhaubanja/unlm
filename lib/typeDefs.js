const { gql } = require("apollo-server-express");

module.exports = gql`
  type Image {
    url: String!
    imageableId: ID!
    imageableType: String!
  }

  type Arrival {
    id: ID!
    Product: Product
  }

  type Product {
    id: ID!
    name: String!
    price: Int!
    Images: [Image]
    categoryId: ID!
  }

  type Category {
    id: ID!
    name: String!
    superId: ID
    Products: [Product]
  }

  type Query {
    categories: [Category]
    arrivals: [Arrival]
    product(id: ID!): Product
  }
`;

// search(supId:ID, catId:ID, subId: ID, text: String) : [Product]