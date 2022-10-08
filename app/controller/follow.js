const Controller = require('egg').Controller;
class FollowController extends Controller {
  async addFollow() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.follow.addFollow(body.userId, body.followingId);
    ctx.body = {
      success: true,
      code: 200,
      res,
    };

  }
  async delFollow() {
    const { ctx } = this;
    const body = ctx.request.body;
    await ctx.service.follow.delFollow(body.userId, body.followingId);
    ctx.body = {
      success: true,
      code: 200,
    };
  }

  async getFollowList() {
    const { ctx } = this;
    const body = ctx.query;
    const res = await ctx.service.follow.getFollowList(body.userId, body.type);
    ctx.body = {
      success: true,
      code: 200,
      data: {
        userList: res,
      },
    };
  }
}

module.exports = FollowController;
