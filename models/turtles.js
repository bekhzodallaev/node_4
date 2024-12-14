module.exports = (Sequelize, sequelize) => {
  return sequelize.define('turtles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    weaponId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'weapons',
        key: 'id',
      },
    },
    firstFavoritePizzaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'pizzas',
        key: 'id',
      },
    },
    secondFavoritePizzaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'pizzas',
        key: 'id',
      },
    },
  });
};
