const express = require('express');
const { graphqlHTTP } = require("express-graphql");

const graphqlSchema = require('./Schema/Schema');

const app = express();

app.get("/", (req, res) => {
    res.send("hello graphql");
}).listen(8080, () => {
    console.log("hello graphql");
})
app.use("/graphQL", graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true
}));

module.exports = app