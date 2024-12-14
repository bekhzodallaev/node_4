const Sequelize = require('sequelize');
const express = require('express');
const config = require('../config.json');
const db = require('../models')(Sequelize, config);
const app = express();

app.use(express.json());

//POST
const createWeapons = async ({ body }, res) => {
  try {
    const weapons = await db.weapons.create(body);
    res.json(weapons);
  } catch (error) {
    res.status(500).send(error);
  }
};
//GET - ALL
const getAllWeapons = async ({ body }, res) => {
  try {
    const weapons = await db.weapons.findAndCountAll(body);
    res.json(weapons);
  } catch (error) {
    res.status(500).send(error);
  }
};
//GET - SINGLE ID
const getWeaponsById = async ({ params }, res) => {
  try {
    const weapons = await db.weapons.findByPK(params.id);

    res.json(weapons);
  } catch (error) {
    res.status(500).send(error);
  }
};

//UPDATE
const updateWeapons = async ({ body, params }, res) => {
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
};

//DELETE
const deleteWeapons = async ({ params }, res) => {
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
};

module.exports = {
  createWeapons,
  getAllWeapons,
  getWeaponsById,
  updateWeapons,
  deleteWeapons,
};
