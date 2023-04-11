const redis = require('redis');
let redisClient;

(async () => {
  redisClient = redis.createClient({
  	legacyMode:true
  });
  console.log('running redis client');
  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect().then(() =>console.log('redis client connected'));
  
})();
module.exports  = redisClient