'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');

class UserController extends Controller {
  /**
     * @author koto
     * @description 用户注册
     * @date 2022-10-06 08:18
     * @version v1.0
     */
  async register() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const user = await ctx.service.user.getUser(params.username);

    if (user) {
      ctx.body = {
        status: 500,
        errMsg: '用户已经存在',
      };
      return;
    }

    const result = await ctx.service.user.add({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.time(),
    });
    if (result) {
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(result.dataValues, [ 'password' ]),
          createTime: ctx.helper.timestamp(result.createTime),
        },
      };
    }
  }

  /**
     * @author koto
     * @description 用户登陆
     * @date 2022-10-06 08:25
     * @version v1.0
     */
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.getUser(username, password);

    if (user) {
      // ctx.session.userId = user.id;
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, [ 'password' ]),
          createTime: ctx.helper.timestamp(user.createTime),
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '该用户不存在',
      };
    }
  }
}

module.exports = UserController;
