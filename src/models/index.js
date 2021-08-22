'use strict';

const POSTGRES_URI = process.env.POSTGRES_URI || 'postgres://localhost/lab06';

const { Sequelize, DataTypes } = require('sequelize');

const user = require('./user.model');

let sequelize = new Sequelize(POSTGRES_URI, {});


module.exports = {
  db: sequelize,
  Users: user(sequelize, DataTypes),
};