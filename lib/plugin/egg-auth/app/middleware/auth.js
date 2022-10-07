/**
 * @author koto
 * @description 登陆验证插件 对需要权限的后端接口进行路由拦截
 * @date 2022-10-07 21:53
 * @version v1.0
 */
module.exports = options => {
    return async (ctx, next) => {
        const url = ctx.request.url;
        // const user=ctx.session[ctx.username];
        const token = ctx.request.token;
        const username = await ctx.app.redis.get(ctx.username);

        const user = username ? username === token : username;

        if(!user && !options.exclude.includes(url.split('?')[0])) {
            ctx.body={
                status:401,
                errMsg:'用户未登录'
            }
        }else {
            await next()
        }
    }
}