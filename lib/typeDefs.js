const { gql } = require("apollo-server-express");

module.exports = gql`
  type Obj {
    status: String
    code: Int
  }

  type Image {
    id: ID!
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
    isRoot: Boolean
    Products: [Product]
  }

  type ProductPage {
    product: Product
    similar: [Product]
  }

  type Query {
    categories: [Category]
    arrivals: [Arrival]
    product(id: ID!): Product
    products(categoryId: ID): [Product]
    search(text: String): [Product]
    productPage(id: ID!): ProductPage
  }

  type Mutation {
    addProduct(
      name: String!
      price: Int!
      categoryId: ID!
      files: [Upload]
    ): Product

    updateProduct(
      id: ID!
      name: String!
      price: Int!
      categoryId: ID!
      files: [Upload]
    ): Product

    deleteImage(id: ID!): Obj

    deleteProduct(id: ID!): Obj
  }
`;
