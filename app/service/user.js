'use strict';

const md5 = require('md5');
const BaseService = require('./base');

class UserService extends BaseService {
  /**
    * @param username
    * @param password
    * @author @koto
    * @description 根据用户名查询用户信息
    * @date 2022-10-05 17:06
    * @version v1.0
    */
  async getUser(username, password) {
    return this.run(async () => {
      const { ctx, app } = this;
      const _where = password ? { username, password: md5(password + app.config.salt) } : { username };
      const result = await ctx.model.User.findOne({
        where: _where,
      });
      return result;
    });
  }

  /**
     * @param params
     * @author
     * @description 向数据库中user表添加用户
     * @date 2022-10-05 17:05xs
     * @version v1.0
     */
  async add(params) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    });
  }

  async edit(params) {
    return this.run(async () => {
      const { ctx } = this;
      const result = ctx.model.User.update(params, {
        where: {
          username: ctx.username,
        },
      });
      return result;
    });
  }
}

module.exports = UserService;
