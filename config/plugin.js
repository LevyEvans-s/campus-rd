'use strict';

const path = require('path')

exports.validate = {
  enable: true,
  package: 'egg-validate', 
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
};
