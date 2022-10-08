const Service = require('egg').Service;

class FollowService extends Service {
  // 需要有四个行为
  // 1. 能查询userId对应的行 （查找我关注的）
  // 2. 能查询的followingId对应的行
  // 3. 能添加userId和followingId行
  // 4. 能删除userId和followingId对应的行
  async getFollowList(userId, type) {
    if (type === 'following') {
      // 我关注的
      return await this.ctx.model.Follow.findAll({
        where: {
          userId,
        },
      });
    } else if (type === 'follower') {
      // 关注我的
      return await this.ctx.model.Follow.findAll({
        where: {
          followingId: userId,
        },
      });
    }
  }
  async findFollow(userId, followingId) {
    return await this.ctx.model.Follow.findAll({
      where: {
        userId,
        followingId,
      },
    });
  }
  async addFollow(userId, followingId) {
    const a = await this.findFollow(userId, followingId);
    if (a.length === 0) {
      return await this.ctx.model.Follow.create(
        { userId, followingId }
      );
    }
    return '重复关注';
  }

  async delFollow(userId, followingId) {
    console.log(await this.ctx.model.Follow.findAll());
    return await this.ctx.model.Follow.destroy({
      where: {
        userId, followingId,
      },
    }
    );
  }
}
module.exports = FollowService;
