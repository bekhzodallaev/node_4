const Sequelize = require('sequelize');
const express = require('express');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const app = express();

app.use(express.json());

//POST
app.post('/api/weapons', async ({ body }, res) => {
  try {
    const weapons = await db.weapons.create(body);
    res.json(weapons);
  } catch (error) {
    res.status(500).send(error);
  }
});
//GET - ALL
app.get('/api/weapons', async ({ body }, res) => {
  try {
    const weapons = await db.weapons.findAndCountAll(body);
    res.json(weapons);
  } catch (error) {
    res.status(500).send(error);
  }
});
//GET - SINGLE ID
app.get('/api/weapons:id', async ({ params }, res) => {
  try {
    const weapons = await db.weapons.findByPk({
      where: {
        id: params.id,
      },
    });

    res.json(weapons);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE
app.put('/api/weapons:id', async ({ body, params }, res) => {
  try {
    const weapons = await db.weapons.update(body, {
      where: {
        id: params.id,
      },
    });
    res.json(weapons);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE
app.delete('/api/weapons:id', async ({ params }, res) => {
  try {
    const weapons = db.weapons.destroy({
      where: {
        id: params.id,
      },
    });
    res.json(weapons);
  } catch (error) {
    res.status(500).send(error);
  }
});
