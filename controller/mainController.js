const axios = require("axios");
const schema = require("../schema/schema");
exports.get = async function (req, res) {
  axios
    .post(
      "https://graphql.anilist.co",
      {
        query: schema,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => res.status(200).send(response.data))
    .catch((e) => res.status(500).send(e));
};
