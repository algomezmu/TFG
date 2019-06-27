
var appRouter = function (app) {

    var authService = require('./../services/authentification.js');
    var usersServices = require('./../services/usersServices.js');
    var loginServices = require('./../services/loginService.js');
    var lookServices = require('./../services/lookService.js');
    var adminServices = require('./../services/adminsService.js');
    var configServices = require('./../services/configService.js');

    const logConfig = require('../config/log-conf');
    const logger = require('js-logging').dailyFile([logConfig.getLogSettings()]);
    var ExpressBrute = require('express-brute');

    var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
    var bruteforce = new ExpressBrute(store, {
        freeRetries: 10,
    });

    var pingBruteforce = new ExpressBrute(store, {
        freeRetries: 100,
    });

    //region Login
    app.post('/api/login',
        bruteforce.prevent, function (request, response) {
        console.log("POST /login");
        logger.info("POST /login");
        loginServices.login(request, response);
    });
    //endregion

    app.get('/api/ping',
        pingBruteforce.prevent,  function (request, response) {
        console.log("GET /ping");
        logger.info("GET /ping");
        response.statusCode = 200;
        response.set({
            'Content-Type': 'application/json'
        });
        return response.send({"status": "ok", "message": "ping"})
    });

    //region Config
    app.get("/api/config", authService.verifytokenAll,  function (request, response) {
        console.log("GET /config");
        logger.info("GET /config");
        configServices.getConfig(response);
    });

    app.post("/api/config", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /config");
        logger.info("POST /config");
        configServices.modifyConfig(request, response);
    });
    //endregion

    //region User
    app.get("/api/user", authService.verifytokenAll,  function (request, response) {
        console.log("GET /user");
        logger.info("GET /user");
        usersServices.getUsers(response);
    });

    app.post("/api/user", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /user");
        logger.info("POST /user");
        usersServices.createUser(request, response);
    });

    app.delete("/api/user/:id", authService.verifytokenAdmin,  function (request, response) {
        console.log("Delete /user");
        logger.info("Delete /user");
        usersServices.deleteUsers(request, response);
    });
    //endregion

    //region Look
    app.post("/api/look/cpu", authService.verifytokenAll,  function (request, response) {
        console.log("POST /look/cpu");
        logger.info("POST /look/cpu");
        lookServices.getCPUHistory(request, response);
    });

    app.post("/api/look/mem", authService.verifytokenAll,  function (request, response) {
        console.log("POST /look/mem");
        logger.info("POST /look/mem");
        lookServices.getMemHistory(request, response);
    });

    app.post("/api/look/network", authService.verifytokenAll,  function (request, response) {
        console.log("POST /look/network");
        logger.info("POST /look/network");
        lookServices.getNetworkHistory(request, response);
    });

    app.get("/api/look/processList/:order/:nProcess", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/processList");
        logger.info("GET /look/processList");
        lookServices.processList(request, response);
    });

    app.get("/api/look/usersLogin", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/usersLogin");
        logger.info("GET /look/usersLogin");
        lookServices.usersLogin(request, response);
    });

    app.get("/api/look/disk", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/disk");
        logger.info("GET /look/disk");
        lookServices.disk(request, response);
    });

    app.get("/api/look/uptime", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/uptime");
        logger.info("GET /look/uptime");
        lookServices.uptime(request, response);
    });

    app.get("/api/look/status", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/status");
        logger.info("GET /look/status");
        lookServices.status(request, response);
    });

    app.get("/api/look/networkCons", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/networkCons");
        logger.info("GET /look/networkCons");
        lookServices.networkCons(request, response);
    });
    //endregion

    //region Process
    app.delete("/api/run/processKiller/:pid", authService.verifytokenAdmin,  function (request, response) {
        console.log("Delete /api/run/processKiller");
        logger.info("Delete /api/run/processKiller");
        lookServices.processKiller(request, response);
    });
    //endregion

    //region Events
    app.get("/api/run/events", authService.verifytokenAll,  function (request, response) {
        console.log("GET /api/run/events");
        logger.info("GET /api/run/events");
        adminServices.getEvents(response);
    });

    app.post("/api/run/events", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /api/run/events");
        logger.info("POST /api/run/events");
        adminServices.createEvent(request, response);
    });

    app.delete("/api/run/events/:id", authService.verifytokenAdmin,  function (request, response) {
        console.log("DELETE /api/run/events");
        logger.info("DELETE /api/run/events");
        adminServices.deleteEvent(request, response);
    });
    //endregion

    //region Scripts
    app.get("/api/run/scripts", authService.verifytokenAll,  function (request, response) {
        console.log("GET /api/run/scripts");
        logger.info("GET /api/run/scripts");
        adminServices.getScripts(response);
    });

    app.post("/api/run/scripts", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /api/run/scripts");
        logger.info("POST /api/run/scripts");
        adminServices.createScripts(request, response);
    });

    app.post("/api/run/scripts/launch", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /api/run/scripts/launch");
        logger.info("POST /api/run/scripts/launch");
        adminServices.launchScript(request, response);
    });

    app.post("/api/run/scripts/launch/perm", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /api/run/scripts/launch/perm");
        logger.info("POST /api/run/scripts/launch/perm");
        adminServices.launchScriptPerm(request, response);
    });

    app.delete("/api/run/scripts/:id", authService.verifytokenAdmin,  function (request, response) {
        console.log("DELETE /api/run/scripts");
        logger.info("DELETE /api/run/scripts");
        adminServices.deleteScripts(request, response);
    });
    //endregion
};

module.exports = appRouter;
