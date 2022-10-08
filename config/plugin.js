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

exports.jwt = {
  enable: 'true',
  package: 'egg-jwt'
}

exports.auth = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-auth')
}

exports.redis = {
  enable: true,
  package: 'egg-redis'
};