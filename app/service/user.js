'use strict'

const Service = require('egg').Service;

class UserService extends Service {
   /**
    * @author @koto
    * @description 根据用户名查询用户信息
    * @date 2022-10-05 17:06
    * @version v1.0
    */
    async getUser(username) {
        try {
            const { ctx } = this;
            const result = await ctx.model.User.findOne({
                where: {
                    username
                }
            })
            return result;
        }catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * @author
     * @description
     * @date 2022-10-05 17:05
     * @version v1.0
     */
    async add(params) {
        try {
            const { ctx } = this;
            const result = await ctx.model.User.create(params);
            return result;
        }catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = UserService