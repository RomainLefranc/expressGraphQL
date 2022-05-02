const express = require("express");
const bodyParser = require("body-parser");
const graphQLrouter = require("./route/graphQLRoute");
const charactersRoute = require("./route/charactersRoute");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/graphql", graphQLrouter);
app.use("/api/characters", charactersRoute);

app.listen(3000);

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("data.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
});

const sql_create = `CREATE TABLE IF NOT EXISTS Characters (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  NomComplet VARCHAR(255) NOT NULL,
  Nom VARCHAR(100),
  Prenom VARCHAR(100),
  ImageUrl VARCHAR(100) NOT NULL
)`;

db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message);
  }
});
