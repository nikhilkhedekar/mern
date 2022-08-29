const { gql } = require("apollo-server");

const typeDefs = gql`
    type customers{
        id: ID
        name: String
        email: String
    }

    type products{
        id: ID
        name: String
        price: Int
        customerId: ID
        customer: [customers]
    }

    type Query{
        getCustomers: [customers]
        getCustomer(id: ID): customers
        getProducts: [products]
        getProduct(id: ID): products                
    }

    input createProduct{
        name: String
        price: Int
        customerId: ID
    }

    input createCustomer{
        name: String
        email: String
    }

    type Mutation{
        addProduct(input: createProduct): products
        addCustomer(input: createCustomer): customers
    }
`

module.exports = typeDefs