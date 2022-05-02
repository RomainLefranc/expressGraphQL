const express = require("express");
const bodyParser = require("body-parser");
const router = require("./route/mainRoute");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

app.listen(3000);
const sqlite3 = require("sqlite3").verbose();
const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connexion réussie à la base de données 'apptest.db'");
});

const sql_create = `CREATE TABLE IF NOT EXISTS LikedCharacters (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  NomComplet VARCHAR(255) NOT NULL,
  Nom VARCHAR(100),
  Prenom VARCHAR(100),
  ImageUrl VARCHAR(100) NOT NULL,
);`;

db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Création réussie de la table 'Livres'");
});
