const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:1337/wikistack');

module.exports = {
  db
}