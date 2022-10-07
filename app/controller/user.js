'use strict';

const md5 = require('md5');
const BaseController = require('./base');

class UserController extends BaseController {
  async jwtSign() {
    const { ctx, app } = this;
    // const username = ctx.request.body.username;
    const username = ctx.params('username');
    const token = app.jwt.sign({
      username,
    }, app.config.jwt.secret);

    // ctx.session[username] = 1;
    await app.redis.set(username, token, 'EX', app.config.redisExpire); // 设置缓存1天

    return token;
  }

  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, [ 'password' ]),
      createTime: ctx.helper.timestamp(result.createTime),
    };
  }
  /**
     * @author koto
     * @description 用户注册
     * @date 2022-10-06 08:18
     * @version v1.0
     */
  async register() {
    const { ctx, app } = this;
    const params = ctx.params();
    const user = await ctx.service.user.getUser(params.username);

    if (user) {
      this.error('用户已存在');
      return;
    }

    const result = await ctx.service.user.add({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.time(),
    });
    if (result) {
      const token = await this.jwtSign();
      this.success({
        ...this.parseResult(ctx, result),
        token,
      });
    } else {
      this.error('注册使用失败ss');
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
    const { username, password } = ctx.params();
    const user = await ctx.service.user.getUser(username, password);

    if (user) {
      // ctx.session.userId = user.id;
      const token = await this.jwtSign();
      this.success({
        ...this.parseResult(ctx, user),
        token,
      });

    } else {
      this.error('用户未注册');
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
      this.success({
        ...this.parseResult(ctx, user),
      });
    } else {
      this.error('该用户不存在，无法获得用户详细信息');
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
      this.success('ok');
    } catch (error) {
      this.error('用户退出登陆失败');
    }
  }

  async edit() {
    const { ctx } = this;
    const result = await ctx.service.user.edit({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
    });
    this.success(result);
  }
}

module.exports = UserController;
