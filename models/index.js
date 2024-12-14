const Turtle = require('./turtles');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

require('dotenv').config();

module.exports = (Sequelize, config) => {
  const sequelize = new Sequelize(
    process.env.DB_NAME || config.database,
    process.env.DB_USER || config.username,
    process.env.DB_PASSWORD || config.password,
    {
      host: process.env.DB_HOST || config.host,
      port: process.env.DB_PORT || config.port,
      dialect: 'postgres',
    }
  );
  const turtles = Turtle(Sequelize, sequelize);
  const weapons = Weapon(Sequelize, sequelize);
  const pizzas = Pizza(Sequelize, sequelize);

  // TODO: create relationships between tables
  //TURTLES
  turtles.associate = function (models) {
    turtles.belongsTo(models.weapons, { foreignKey: 'weaponId' });

    turtles.belongsTo(models.pizzas, { foreignKey: 'firstFavoritePizzaId' });
    turtles.belongsTo(models.pizzas, { foreignKey: 'secondFavoritePizzaId' });
  };

  //WEAPONS
  weapons.associate = function (models) {
    weapons.hasMany(models.turtles, { foreignKey: 'weaponId' });
  };

  //PIZZAS
  pizzas.associate = (models) => {
    pizzas.hasMany(models.turtles, { foreignKey: 'firstFavoritePizzaId' });
    pizzas.hasMany(models.turtles, { foreignKey: 'secondFavoritePizzaId' });
  };

  return {
    turtles,
    weapons,
    pizzas,

    sequelize,
    Sequelize,
  };
};
