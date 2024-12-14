const Sequelize = require('sequelize');
const express = require('express');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const app = express();
const turtleController = require('./controllers/turtlesController');
const pizzaControler = require('./controllers/pizzaController');
const weaponController = require('./controllers/weaponController');
app.use(express.json());

// TODO: database queries

//CRUD TURTLES
app.post('/api/turtles', turtleController.createTurtle);
app.get('/api/turtles', turtleController.getAllTurtles);
app.get('/api/turtles/:id', turtleController.getTurtleById);
app.put('/api/turtles/:id', turtleController.updateTurtle);
app.delete('/api/turtles/:id', turtleController.deleteTurtle);

//CRUD PIZZAS
app.post('/api/pizzas', pizzaControler.createPizza);
app.get('/api/pizzas', pizzaControler.getAllPizza);
app.get('/api/pizzas/:id', pizzaControler.getPizzaById);
app.put('/api/pizzas/:id', pizzaControler.updatePizza);
app.delete('/api/pizzas/:id', pizzaControler.deletePizza);

//CRUD WEAPONS
app.post('/api/weapons', weaponController.createWeapons);
app.get('/api/weapons', weaponController.getAllWeapons);
app.get('/api/weapons/:id', weaponController.getWeaponsById);
app.put('/api/weapons/:id', weaponController.updateWeapons);
app.delete('/api/weapons/:id', weaponController.deleteWeapons);

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Connected to db');

    app.listen(4000, () => console.log('server started'));
  })
  .catch((err) => console.log('error', err));
