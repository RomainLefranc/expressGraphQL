const Character = require("../model/character");

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
    .then((e) => res.status(200).send(e))
    .catch((e) => res.status(500).send(e));
};

exports.add = async function (req, res) {
  Character.create(req.body)
    .then((e) => res.status(200).send(e))
    .catch((e) => res.status(500).send(e));
};

exports.delete = async function (req, res) {
  let { characterfullName } = req.params;
  characterfullName = decodeURIComponent(characterfullName);
  const character = await Character.findOne({
    where: {
      fullName: characterfullName,
    },
  });
  if (!character) {
    return res.status(404).send("characterId invalide");
  }
  Character.destroy({
    where: {
      id: character.id,
    },
  })
    .then(() => res.sendStatus(200))
    .catch((e) => res.status(500).send(e));
};
