const express = require('express');
require('dotenv').config();
const schema = require('./schema/schema');
const port = process.env.PORT || 5000;
const node_env = process.env.NODE_ENV;
const {
    graphqlHTTP
} = require('express-graphql');

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development',
    })
);



app.listen(port, console.log(`server running on port: ${port}`))