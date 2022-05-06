const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Character = sequelize.define("Character", {
  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

(async () => {
  await Character.sync({ force: true });
})();

module.exports = Character;
