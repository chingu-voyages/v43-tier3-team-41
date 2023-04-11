const redis = require('redis');
let redisClient;

(async () => {
  redisClient = redis.createClient('redis://red-cgqeu3e4dad5es0flv3g:6379', {
  	legacyMode:true
  });
  console.log('running redis client');
  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect().then(() =>console.log('redis client connected'));
  
})();
module.exports  = redisClient