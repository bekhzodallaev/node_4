const Turtle = require('./turtles');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

require('dotenv').config();
module.exports = (Sequelize, config) => {
  config = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
    }
  );
  const turtles = Turtle(Sequelize, sequelize);
  const weapons = Weapon(Sequelize, sequelize);
  const pizzas = Pizza(Sequelize, sequelize);

  // TODO: create relationships between tables

  return {
    turtles,
    weapons,
    pizzas,

    sequelize: sequelize,
    Sequelize: Sequelize,
  };
};
