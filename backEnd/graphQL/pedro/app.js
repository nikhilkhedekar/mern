const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./Schema/apolloTypeDefs");
const resolvers = require("./Schema/apolloResolvers");

const app = new ApolloServer({ typeDefs, resolvers });
mongoose.connect("mongodb+srv://Dhungel:Dhungel@awsdhungel.oevqe.mongodb.net/AWSDhungel?retryWrites=true&w=majority");

app.listen(8080, () => {
    console.log("hello apollo server");
});

module.exports = app
// const express = require('express');
// const mongoose = require("mongoose");
// const { graphqlHTTP } = require("express-graphql");
// const cors = require("cors");

// const graphqlSchema = require('./Schema/Schema');

// const app = express();

// app.use(cors());
// app.use(express.json())

// const userName = encodeURIComponent("nikhilkhedekar");
// const password = encodeURIComponent("Abcd@1234");
// mongoose.connect(`mongodb+srv://Dhungel:Dhungel@awsdhungel.oevqe.mongodb.net/AWSDhungel?retryWrites=true&w=majority`);

// app.get("/", (req, res) => {
//     res.send("hello graphql");
// }).listen(8080, () => {
//     console.log("hello graphql");
// })
// app.use("/graphQL", graphqlHTTP({
//     schema: graphqlSchema,
//     graphiql: true
// }));

// module.exports = app