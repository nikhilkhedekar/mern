const graphql = require("graphql");

const products = [
    { id: "p1", name: "nike", price: 10000 },
    { id: "p2", name: "adidas", price: 10000 },
    { id: "p3", name: "puma", price: 10000 },
]

const GetProducts = new graphql.GraphQLObjectType({
    name: "products",
    fields: () => ({
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        price: { type: graphql.GraphQLInt }
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: "rootQueryType",
    fields: {
        products: {
            type: GetProducts,
            args: { id: { type: graphql.GraphQLString }, },
            resolve: (parent, args) => {
                return products.find(data => data.id === args.id);
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery 
})