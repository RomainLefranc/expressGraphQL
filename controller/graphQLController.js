const axios = require("axios");
const {
  GET_LIST_CHARACTER,
  SEARCH_CHARACTER_BY_ANIME,
  GET_CHARACTER_BY_ID,
} = require("../schema/schema");
const Character = require("../model/character");

exports.getAll = async function (req, res) {
  axios
    .post(
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
    )
    .then(async (response) => {
      const result = await Promise.all(
        response.data.data.Page.characters.map(async (character) => {
          const dbCharacter = await Character.findOne({
            where: {
              characterId: character.id,
            },
          });
          return {
            id: character.id,
            first: character.name.first,
            last: character.name.last,
            full: character.name.full,
            image: character.image.large,
            liked: dbCharacter ? true : false,
          };
        })
      );
      return res.status(200).send(result);
    })
    .catch((e) => res.status(500).send(e));
};

exports.getByAnime = async function (req, res) {
  let { search } = req.params;
  search = decodeURIComponent(search);
  axios
    .post(
      "https://graphql.anilist.co",
      {
        query: SEARCH_CHARACTER_BY_ANIME,
        variables: {
          search: search,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(async (response) => {
      const result = await Promise.all(
        response.data.data.Media.characters.nodes.map(async (character) => {
          const dbCharacter = await Character.findOne({
            where: {
              characterId: character.id,
            },
          });
          const liked = dbCharacter ? true : false;
          return {
            id: character.id,
            first: character.name.first,
            last: character.name.last,
            full: character.name.full,
            image: character.image.large,
            liked,
          };
        })
      );
      res.status(200).send(result);
    })
    .catch((e) => res.status(500).send(e));
};

exports.getRandom = async function (req, res) {
  let rand = Math.random() * 5000;
  rand = Math.floor(rand);

  axios
    .post(
      "https://graphql.anilist.co",
      {
        query: GET_CHARACTER_BY_ID,
        variables: {
          id: rand,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(async (response) => {
      const character = response.data.data.Character;
      const dbCharacter = await Character.findOne({
        where: {
          characterId: character.id,
        },
      });
      const liked = dbCharacter ? true : false;
      character.liked = liked;
      return res.status(200).send({
        id: character.id,
        first: character.name.first,
        last: character.name.last,
        full: character.name.full,
        image: character.image.large,
        liked,
      });
    })
    .catch((e) => res.status(500).send(e));
};
