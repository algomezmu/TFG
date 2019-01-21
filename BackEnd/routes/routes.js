
var appRouter = function (app) {

    var authService = require('./../services/authentification.js');
    var usersServices = require('./../services/usersServices.js');
    var loginServices = require('./../services/loginService.js');
    var lookServices = require('./../services/lookService.js');
    var adminServices = require('./../services/adminsService.js');
    var configServices = require('./../services/configService.js');

    const logConfig = require('../config/log-conf');
    const logger = require('js-logging').dailyFile([logConfig.getLogSettings()]);

    //region Login
    app.post('/api/login', function (request, response) {
        console.log("POST /login");
        loginServices.login(request, response);
    });
    //endregion

    app.get('/api/ping', function (request, response) {
        console.log("GET /ping");
        response.statusCode = 200;
        response.set({
            'Content-Type': 'application/json'
        });
        return response.send({"status": "ok", "message": "ping"})
    });

    //region Config
    app.get("/api/config", authService.verifytokenAll,  function (request, response) {
        console.log("GET /config");
        configServices.getConfig(response);
    });

    app.post("/api/config", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /config");
        configServices.modifyConfig(request, response);
    });
    //endregion

    //region User
    app.get("/api/user", authService.verifytokenAll,  function (request, response) {
        console.log("GET /user");
        usersServices.getUsers(response);
    });

    app.post("/api/user", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /user");
        usersServices.createUser(request, response);
    });

    app.delete("/api/user/:id", authService.verifytokenAdmin,  function (request, response) {
        console.log("Delete /user");
        usersServices.deleteUsers(request, response);
    });
    //endregion

    //region Look
    app.post("/api/look/cpu", authService.verifytokenAll,  function (request, response) {
        console.log("POST /look/cpu");
        lookServices.getCPUHistory(request, response);
    });

    app.post("/api/look/mem", authService.verifytokenAll,  function (request, response) {
        console.log("POST /look/mem");
        lookServices.getMemHistory(request, response);
    });

    app.post("/api/look/network", authService.verifytokenAll,  function (request, response) {
        console.log("POST /look/network");
        lookServices.getNetworkHistory(request, response);
    });

    app.get("/api/look/processList/:order/:nProcess", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/processList");
        lookServices.processList(request, response);
    });

    app.get("/api/look/usersLogin", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/usersLogin");
        lookServices.usersLogin(request, response);
    });

    app.get("/api/look/disk", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/disk");
        lookServices.disk(request, response);
    });

    app.get("/api/look/uptime", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/uptime");
        lookServices.uptime(request, response);
    });

    app.get("/api/look/status", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/status");
        lookServices.status(request, response);
    });

    app.get("/api/look/networkCons", authService.verifytokenAll,  function (request, response) {
        console.log("GET /look/networkCons");
        lookServices.networkCons(request, response);
    });
    //endregion

    //region Process
    app.delete("/api/run/processKiller/:pid", authService.verifytokenAdmin,  function (request, response) {
        console.log("Delete /api/run/processKiller");
        lookServices.processKiller(request, response);
    });
    //endregion

    //region Events
    app.get("/api/run/events", authService.verifytokenAll,  function (request, response) {
        console.log("GET /api/run/events");
        adminServices.getEvents(response);
    });

    app.post("/api/run/events", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /api/run/events");
        adminServices.createEvent(request, response);
    });

    app.delete("/api/run/events/:id", authService.verifytokenAdmin,  function (request, response) {
        console.log("DELETE /api/run/events");
        adminServices.deleteEvent(request, response);
    });
    //endregion

    //region Scripts
    app.get("/api/run/scripts", authService.verifytokenAll,  function (request, response) {
        console.log("GET /api/run/scripts");
        adminServices.getScripts(response);
    });

    app.post("/api/run/scripts", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /api/run/scripts");
        adminServices.createScripts(request, response);
    });

    app.post("/api/run/scripts/launch", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /api/run/scripts/launch");
        adminServices.launchScript(request, response);
    });

    app.post("/api/run/scripts/launch/perm", authService.verifytokenAdmin,  function (request, response) {
        console.log("POST /api/run/scripts/launch/perm");
        adminServices.launchScriptPerm(request, response);
    });

    app.delete("/api/run/scripts/:id", authService.verifytokenAdmin,  function (request, response) {
        console.log("DELETE /api/run/scripts");
        adminServices.deleteScripts(request, response);
    });
    //endregion
};

module.exports = appRouter;
