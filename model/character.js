const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Character = sequelize.define(
  "Character",
  {
    // Model attributes are defined here
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

(async () => {
  await Character.sync();
})();

module.exports = Character;
