const Sequelize = require('sequelize');
const express = require('express');
const config = require('../config.json');
const db = require('../models')(Sequelize, config);
const app = express();
app.use(express.json());

//POST
const createPizza = async ({ body }, res) => {
  try {
    const pizzas = await db.pizzas.create(body);
    res.json(pizzas);
  } catch (error) {
    res.status(500).send(error);
  }
};
//GET - ALL
const getAllPizza = async ({ body }, res) => {
  try {
    const pizzas = await db.pizzas.findAndCountAll(body);
    res.json(pizzas);
  } catch (error) {
    res.status(500).send(error);
  }
};
//GET - SINGLE ID
const getPizzaById = async ({ params }, res) => {
  try {
    const pizza = await db.pizzas.findByPk(params.id);

    res.json(pizza);
  } catch (error) {
    res.status(500).send(error);
  }
};

//UPDATE
const updatePizza = async ({ body, params }, res) => {
  try {
    const pizza = await db.pizzas.update(body, {
      where: {
        id: params.id,
      },
    });
    res.json(pizza);
  } catch (error) {
    res.status(500).send(error);
  }
};

//DELETE
const deletePizza = async ({ params }, res) => {
  try {
    const pizza = db.pizzas.destroy({
      where: {
        id: params.id,
      },
    });
    res.json(pizza);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createPizza,
  getAllPizza,
  getPizzaById,
  updatePizza,
  deletePizza,
};
