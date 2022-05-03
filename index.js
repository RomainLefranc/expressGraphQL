const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const graphQLrouter = require("./route/graphQLRoute");
const charactersRoute = require("./route/charactersRoute");
const { Sequelize } = require("sequelize");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/graphql", graphQLrouter);
app.use("/api/characters", charactersRoute);

app.listen(1337);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data/data.db",
});
sequelize.authenticate();
