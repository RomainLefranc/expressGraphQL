const Character = require("../model/character");

exports.get = async function (req, res) {
  const { characterId } = req.params;
  Character.findByPk(characterId)
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

exports.update = async function (req, res) {
  const { characterId } = req.params;
  const character = await Character.findByPk(characterId);
  if (!character) {
    return res.status(404).send("characterId invalide");
  }
  Character.update(req.body, { where: { id: character.id } })
    .then((e) => res.status(200).send(e))
    .catch((e) => res.status(500).send(e));
};

exports.delete = async function (req, res) {
  const { characterId } = req.params;
  const character = await Character.findByPk(characterId);
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
