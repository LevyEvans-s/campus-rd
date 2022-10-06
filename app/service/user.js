'use strict';

const Service = require('egg').Service;
const md5 = require('md5');

class UserService extends Service {
  /**
    * @param username
    * @param password
    * @author @koto
    * @description 根据用户名查询用户信息
    * @date 2022-10-05 17:06
    * @version v1.0
    */
  async getUser(username, password) {
    try {
      const { ctx, app } = this;
      const _where = password ? { username, password: md5(password + app.config.salt) } : { username };
      const result = await ctx.model.User.findOne({
        where: _where,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
     * @param params
     * @author
     * @description
     * @date 2022-10-05 17:05xs
     * @version v1.0
     */
  async add(params) {
    try {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserService;
