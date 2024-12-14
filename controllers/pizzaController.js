const Sequelize = require('sequelize');
const express = require('express');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const app = express();

app.use(express.json());

//POST
app.post('/api/pizza', async ({ body }, res) => {
  try {
    const pizzas = await db.pizzas.create(body);
    res.json(pizzas);
  } catch (error) {
    res.status(500).send(error);
  }
});
//GET - ALL
app.get('/api/pizzas', async ({ body }, res) => {
  try {
    const pizzas = await db.pizzas.findAndCountAll(body);
    res.json(pizzas);
  } catch (error) {
    res.status(500).send(error);
  }
});
//GET - SINGLE ID
app.get('/api/pizzas/:id', async ({ params }, res) => {
  try {
    const pizza = await db.pizzas.findByPk(params.id);

    res.json(pizza);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE
app.put('/api/pizzas/:id', async ({ body, params }, res) => {
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
});

//DELETE
app.delete('/api/pizzas/:id', async ({ params }, res) => {
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
});
