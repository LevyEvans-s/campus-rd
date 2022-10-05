module.exports = app => {
    const store = {}
    app.sessionStore = {
        async get(key) {
            return store[key]
        },
        async set(key,value,maxAge) {
            store[key]=value
        },
        async destory() {
            store[key] = null
        }
    }
}