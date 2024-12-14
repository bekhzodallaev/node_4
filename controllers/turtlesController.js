const Sequelize = require('sequelize');
const express = require('express');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const app = express();

app.use(express.json());

//POST
app.post('/api/turtles', async ({ body }, res) => {
  try {
    const turtles = await db.turtles.create(body);
    res.json(turtles);
  } catch (error) {
    res.status(500).send(error);
  }
});
//GET - ALL
app.get('/api/turtles', async ({ body }, res) => {
  try {
    const turtles = await db.turtles.findAndCountAll(body);
    res.json(turtles);
  } catch (error) {
    res.status(500).send(error);
  }
});
//GET - SINGLE ID
app.get('/api/turtles/:id', async ({ params }, res) => {
  try {
    const turtle = await db.turtles.findByPK(params.id);

    res.json(turtle);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE
app.put('/api/turtles/:id', async ({ body, params }, res) => {
  try {
    const turtle = await db.turtles.update(body, {
      where: {
        id: params.id,
      },
    });
    res.json(turtle);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE
app.delete('/api/turtles/:id', async ({ params }, res) => {
  try {
    const turtle = db.turtles.destroy({
      where: {
        id: params.id,
      },
    });
    res.json(turtle);
  } catch (error) {
    res.status(500).send(error);
  }
});
