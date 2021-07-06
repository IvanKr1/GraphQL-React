const express = require("express");
const cors = require("cors")
const { graphqlHTTP } = require("express-graphql");
// const { graphql } = require("graphql");
const schema = require("./Schemas/index");
const app = express();


app.use(express.json())
app.use(cors())
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
