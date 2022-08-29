const mongoProducts = require("./mongoProductSchema");
const mongoCustomers = require("./mongoCustomerSchema");

const products = [
    { id: "p1", name: "nike", price: 10000, customerId: "c1" },
    { id: "p2", name: "adidas", price: 10000, customerId: "c1" },
    { id: "p3", name: "puma", price: 10000, customerId: "c2" },
    { id: "p4", name: "sports", price: 10000, customerId: "c1" },
    { id: "p5", name: "woodland", price: 10000, customerId: "c2" },
    { id: "p6", name: "pegasus", price: 10000, customerId: "c1" },
    { id: "p3", name: "underarmour", price: 10000, customerId: "c3" }
]

const customers = [
    { id: "c1", name: "nikhil", email: "nikhil@gmail.com" },
    { id: "c2", name: "sapna", email: "sapna@gmail.com" },
    { id: "c3", name: "manali", email: "manali@gmail.com" }
]

const resolvers = {
    Query:  {
        //Customer Resolvers     
        getCustomers:(parent, args) => {
            return customers;
        },
        getCustomer: (parent, args) => {
            return customers.find(data => data.id === args.id);
        },
        //Product Resolvers    
        getProducts: () => {
            return products
        },
        getProduct: (parent,args) => {
            return products.find(data => data.id === args.id);
        },
        
    },    
    products: {
        customer: (parent, args) => {
            return customers.find(data => {                
                console.log("customerId", data.id);
                console.log("prodictId", parent.customerId)
                // return data.id === parent.customerId
            });
        }
    },
    Mutation: {
        addCustomer: (parent, args) => {
            return mongoCustomers.create(args.input)
        },
        addProduct: (parent,args) => {
            return mongoProducts.create(args.input)
        },
    }
}

module.exports = resolvers