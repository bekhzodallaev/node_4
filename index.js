const Sequelize = require('sequelize');

const config = require('./config.json');

const db = require('./models')(Sequelize, config);

// TODO: database queries

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Connected to db');

    app.listen(3000, () => console.log('server started'));
  })
  .catch((err) => console.log('error', err));
