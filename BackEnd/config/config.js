// Recomended to delete this user
var first_user_name = "admin"
var first_user_password = "fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe";
//"12345678"

var domainDB = 'mongodb://localhost:27017/monitor';

var activateSSL = false;

// BotLook
var lookCPU = true;
var lookMemory = true;
var lookNetwork = true;

//s (seconds no more than 60)
//m (minutes no more than 60)
//h (hours no more than 24)
//"5 m" “At every 5th minute.”
// The same as crontab
var lookCPUTimer = "1 m";
var lookMemoryTimer = "1 m"; //s/m/h
var lookNetworkTimer = "1 m"; //s/m/h

var dLookROThan = "7"; //Delete Look Registers Older Than 7 days (Once one register is saved, can't be changed for that register)

var userDirectory; //Automaticaly, gets the user directory

var jwt_secret_admin = "5A3xvd5_8asd";
var jwt_secret_monitor = "3Z4rve33_dfg";
//Generate random keys for jwt token at the start
//var jwt_secret_admin = Math.random().toString(36).slice(-8);
//var jwt_secret_monitor = Math.random().toString(36).slice(-8);

var crypt_secret = "farZxa_12P54r";

//If you want to use a root user in the app
//WARNING use this only if necessary, recommend to put permissions to the user for a specify command and not root
var permUser = "root";
var permPassword = "VrpaqHZUAX6hAu}B";
var authentificatePerm = "fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe"; //SHA512

exports.authentificatePerm = authentificatePerm;
exports.permUser = permUser;
exports.permPassword = permPassword;
exports.userDirectory = userDirectory;
exports.activateSSL = activateSSL;
exports.first_user_name = first_user_name;
exports.first_user_password = first_user_password;
exports.lookCPUTimer = lookCPUTimer;
exports.lookMemoryTimer = lookMemoryTimer;
exports.lookNetworkTimer = lookNetworkTimer;
exports.dLookROThan = dLookROThan;
exports.lookCPU = lookCPU;
exports.lookMemory = lookMemory;
exports.lookNetwork = lookNetwork;
exports.crypt_secret = crypt_secret;
exports.jwt_secret_admin = jwt_secret_admin;
exports.jwt_secret_monitor = jwt_secret_monitor;
exports.domainDB = domainDB;