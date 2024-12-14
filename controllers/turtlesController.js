const Sequelize = require('sequelize');
const express = require('express');
const config = require('../config.json');
const db = require('../models')(Sequelize, config);
const app = express();

app.use(express.json());

//CREATE
const createTurtle = async (req, res) => {
  console.log('Received POST request with body:', req.body);
  try {
    const turtle = await db.turtles.create(req.body);
    res.json(turtle);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// GET -ALL
const getAllTurtles = async (req, res) => {
  try {
    const turtles = await db.turtles.findAndCountAll();
    res.json(turtles);
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET - SINGLE 
const getTurtleById = async (req, res) => {
  try {
    const turtle = await db.turtles.findByPk(req.params.id);
    res.json(turtle);
  } catch (error) {
    res.status(500).send(error);
  }
};

// PUT
const updateTurtle = async (req, res) => {
  try {
    const turtle = await db.turtles.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(turtle);
  } catch (error) {
    res.status(500).send(error);
  }
};

// DELETE
const deleteTurtle = async (req, res) => {
  try {
    const turtle = await db.turtles.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(turtle);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createTurtle,
  getAllTurtles,
  getTurtleById,
  updateTurtle,
  deleteTurtle,
};
