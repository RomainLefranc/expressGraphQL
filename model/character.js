const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Character = sequelize.define("Character", {
  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

(async () => {
  try {
    await Character.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
})();

module.exports = Character;
