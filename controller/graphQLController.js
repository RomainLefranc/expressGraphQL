const axios = require("axios");
const { GET_LIST_CHARACTER } = require("../schema/schema");

exports.getAll = async function (req, res) {
  axios
    .post(
      "https://graphql.anilist.co",
      {
        query: GET_LIST_CHARACTER,
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
