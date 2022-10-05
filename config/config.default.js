/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.cluster = {
      listen: {
          path: '',
          port: 8083,
          hostname: '0.0.0.0', // 0.0.0.0
      }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1664958452533_8282';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.session = {
    key:'CAMPUSS_SESS',
    maxAge: 24 * 60 * 1000
  };

  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'campus_rd_house'
    }
  };
  
  // Sequelize config
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'campus_rd_house',
    define: {
      timestamps: false,
      freezeTableName: true
    }
  };

  // add your user config here
  const userConfig = {
    salt: 'campus_rd_^thisisasha256+rsa_pwd' // 加密盐，用于用户密码md5加密
  };

  return {
    ...config,
    ...userConfig,
  };
};
