const graphql = require("graphql");
const mongoProducts = require("./mongoProductSchema");
const mongoCustomers = require("./mongoCustomerSchema");

//============= Beginner ==================================================

const products = [
    { id: "p1", name: "nike", price: 10000, customer: "c1" },
    { id: "p2", name: "adidas", price: 10000, customer: "c1" },
    { id: "p3", name: "puma", price: 10000, customer: "c2" },
    { id: "p4", name: "sports", price: 10000, customer: "c1" },
    { id: "p5", name: "woodland", price: 10000, customer: "c2" },
    { id: "p6", name: "pegasus", price: 10000, customer: "c1" },
    { id: "p3", name: "underarmour", price: 10000, customer: "c3" }
]

const customers = [
    { id: "c1", name: "nikhil", email: "nikhil@gmail.com" },
    { id: "c2", name: "sapna", email: "sapna@gmail.com" },
    { id: "c3", name: "manali", email: "manali@gmail.com" }
]

const GetCustomers = new graphql.GraphQLObjectType({
    name: "customers",
    fields: () => ({
        name: { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString },
    })
})

const GetProducts = new graphql.GraphQLObjectType({
    name: "products",
    fields: () => ({
        name: { type: graphql.GraphQLString },
        price: { type: graphql.GraphQLInt },
        //not get on mongo
        customer: {
            type: GetCustomers,
            resolve(parent, args) {
                return mongoCustomers.findById(parent.customer)
            }
        }
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: "rootQueryType",
    fields: {
        // product: {
        //     type: GetProducts,
        //     args: { id: { type: graphql.GraphQLID }, },
        //     resolve: (parent, args) => {
        //         return products.find(data => data.id === args.id);
        //     }
        // },
        // customer: {
        //     type: GetCustomers,
        //     args: { id: { type: graphql.GraphQLID }, },
        //     resolve: (parent, args) => {
        //         return customers.find(data => data.id === args.id);
        //     }
        // },
        getProducts: {
            type: new graphql.GraphQLList(GetProducts),
            resolve: () => {
                return mongoProducts.find({});
            }
        },
        getProduct: {
            type: GetProducts,
            args: {
                id: { type: graphql.GraphQLID }
            },
            resolve: (parent, args) => {
                return mongoProducts.findById(args.id)
            } 
        },
        getCustomers: {
            type: new graphql.GraphQLList(GetCustomers),
            resolve: () => {
                return mongoCustomers.find({});
            }
        },
        getCustomer: {
            type: new graphql.GraphQLList(GetCustomers),
            args: {
                id: { type: graphql.GraphQLID }
            },
            resolve: (parent, args) => {
                return mongoCustomers.findById(args.id)
            } 
        },
    }
})

const Mutation = new graphql.GraphQLObjectType({
    name: "MongoMutation",
    fields: {
        addProduct: {
            type: GetProducts,
            args: {
                name: { type: graphql.GraphQLString },
                price: { type: graphql.GraphQLInt },
                customer: { type: graphql.GraphQLID }
            },
            resolve: (parent, args) => {
                return mongoProducts.create({
                    name: args.name,
                    price: args.price,
                    customer: args.customer
                })
            }
        },
        addCustomer: {
            type: GetCustomers,
            args: {
                name: { type: graphql.GraphQLString },
                email: { type: graphql.GraphQLString }
            },
            reslove: (parent, args) => {
                return mongoCustomers.create({
                    name: args.name,
                    email: args.email
                })
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})