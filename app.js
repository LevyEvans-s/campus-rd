module.exports = app => {
    const store = {}
    app.sessionStore = {
        async get(key) {
            return store[key]
        },
        async set(key,value,maxAge) {
            store[key]=value
        },
        async destroy(key) {
            store[key] = null
        }
    }

    // 中间件
    app.config.coreMiddleware.push('auth')
}

const egg = require('egg');

const workers = Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers,
  baseDir: __dirname,
});
