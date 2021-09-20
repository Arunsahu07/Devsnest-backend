const redis = require("redis");
const connectRedis = require("connect-redis");
const session = require("express-session");
const redisStore = connectRedis(session);
const redisClient = redis.createClient({
  host : "localhost",
  port : 6379,  
})
redisClient.on('error', ()=>{
    console.log("unable to connect the redis");
})
redisClient.on("connect", ()=>{
    console.log("connected to redis");
})
module.exports = {redisClient, redisStore, session};

