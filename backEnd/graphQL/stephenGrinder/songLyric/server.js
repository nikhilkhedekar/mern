const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require("cors");

const app = express();

const userName = encodeURIComponent("nikhilkhedekar");
const password = encodeURIComponent("Abcd@1234");
const MONGO_URI = `mongodb+srv://${userName}:${password}@graphql-mern.wtb5vez.mongodb.net/graphql-mern?retryWrites=true&w=majority`
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

app.use(cors());
app.use(express.json());

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use('/graphql', graphqlHTTP({
  schema,
}));

app.listen(8080, () => {
  console.log("listening 8080")
})

module.exports = app;
