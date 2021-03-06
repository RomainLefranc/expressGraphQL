const Character = require("../model/character");
const { GET_CHARACTER_BY_ID } = require("../schema/schema");
const axios = require("axios");

exports.get = async function (req, res) {
  let { characterfullName } = req.params;
  characterfullName = decodeURIComponent(characterfullName);
  Character.findOne({
    where: {
      fullName: characterfullName,
    },
  })
    .then((e) => res.status(200).send(e))
    .catch((e) => res.status(500).send(e));
};

exports.getAll = async function (req, res) {
  Character.findAll()
    .catch((e) => res.status(500).send(e))
    .then(async (characters) => {
      try {
        const result = await Promise.all(
          characters.map(async (character) => {
            const response = await axios.post(
              "https://graphql.anilist.co",
              {
                query: GET_CHARACTER_BY_ID,
                variables: {
                  id: character.characterId,
                },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const aniCharacter = response.data.data.Character;
            return {
              id: character.characterId,
              first: aniCharacter.name.first,
              last: aniCharacter.name.last,
              full: aniCharacter.name.full,
              image: aniCharacter.image.large,
              liked: true,
            };
          })
        );
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send(error);
      }
    });
};

exports.add = async function (req, res) {
  Character.create(req.body)
    .then((e) => res.status(200).send(e))
    .catch((e) => res.status(500).send(e));
};

exports.delete = async function (req, res) {
  let { characterId } = req.params;
  Character.destroy({
    where: {
      characterId: characterId,
    },
  })
    .then(() => res.sendStatus(200))
    .catch((e) => res.status(500).send(e));
};
