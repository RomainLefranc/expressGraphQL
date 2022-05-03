const axios = require("axios");
const { GET_LIST_CHARACTER } = require("../schema/schema");
const Character = require("../model/character");

exports.getAll = async function (req, res) {
  const response = await axios.post(
    "https://graphql.anilist.co",
    {
      query: GET_LIST_CHARACTER,
      variables: {
        page: req.body.page,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await Promise.all(
    response.data.data.Page.characters.map(async (character) => {
      const dbCharacter = await Character.findOne({
        where: {
          fullName: character.name.full,
        },
      });
      const liked = dbCharacter ? true : false;
      character.liked = liked;
      return {
        first: character.name.first,
        last: character.name.last,
        full: character.name.full,
        image: character.image.medium,
        liked,
      };
    })
  );
  return res.status(200).send(result);
};
