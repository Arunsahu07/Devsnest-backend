const redis = require("redis");
const connectRedis = require("connect-redis");
const session = require("express-session");
const redisStore = connectRedis(session);
const redisClient = redis.createClient({
    host: 'localhost',
    post: 6379
})
redisClient.on("error", ()=>{console.log("could not connect to redis");});
redisClient.on("connect", ()=>{console.log("connect with redis");});
module.exports = {redisStore, redisClient, session}