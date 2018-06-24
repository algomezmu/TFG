
var domainDB = 'mongodb://localhost:27017/monitor';

var jwt_secret = "5A3xvd5_8asd";

var crypt_secret = "farZxa_12P54r";

var time_boot_look = 300000;

// BotLook
var lookCPU = true;
var lookMemory = true;
var lookNetwork = true;

//s (seconds no more than 60)
//m (minutes no more than 60)
//h (hours no more than 60)
//"5 m" “At every 5th minute.”
// The same as crontab
var lookCPUTimer = "5 m";
var lookMemoryTimer = "5 m"; //s/m/h
var lookNetworkTimer = "5 m"; //s/m/h

exports.lookCPUTimer = lookCPUTimer;
exports.lookMemoryTimer = lookMemoryTimer;
exports.lookNetworkTimer = lookNetworkTimer;
exports.lookCPU = lookCPU;
exports.lookMemory = lookMemory;
exports.lookNetwork = lookNetwork;
exports.time_boot_look = time_boot_look;
exports.crypt_secret = crypt_secret;
exports.jwt_secret = jwt_secret;
exports.domainDB = domainDB;