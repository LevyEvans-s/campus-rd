'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');

class UserController extends Controller {
  async jwtSign() {
    const { ctx, app } = this;
    const username = ctx.request.body.username;
    const token = app.jwt.sign({
      username,
    }, app.config.jwt.secret);

    ctx.session[username] = 1;

    return token;
  }
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
      const token = await this.jwtSign();
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(result.dataValues, [ 'password' ]),
          createTime: ctx.helper.timestamp(result.createTime),
          token,
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
      const token = await this.jwtSign();
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, [ 'password' ]),
          createTime: ctx.helper.timestamp(user.createTime),
          token,
        },
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '该用户不存在',
      };
    }
  }

  /**
   * @author koto
   * @description 获取用户详情
   * @date 2022-10-07 21:11
   * @version v1.0
   */
  async detail() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);

    if (user) {
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

  /**
   * @author koto
   * @description 用户退出登陆
   * @date 2022-10-07 21:16
   * @version v1.0
   */
  async logout() {
    const { ctx } = this;
    try {
      ctx.session[ctx.username] = null; // 清除session
      ctx.body = {
        status: 200,
        success: true,
        msg: '退出登陆成功',
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        errMsg: '退出登陆失败',
      };
    }
  }
}

module.exports = UserController;
