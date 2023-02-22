require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, } = process.env;
const modelDog = require('./models/Dog.js');
const modelTemperament = require('./models/Temperament.js');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

modelDog(sequelize);
modelTemperament(sequelize);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Dog.belongsToMany(Temperament, { through: "temperDog" });
Temperament.belongsToMany(Dog, { through: "temperDog" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importar la conexión { conn } = require('./db.js');
  Op
};
