var appRouter = function (app) {

    var authService = require('./../services/authentification.js');
    var usersServices = require('./../services/usersServices.js');
    var loginServices = require('./../services/loginService.js');
    var lookServices = require('./../services/lookService.js');
    var adminServices = require('./../services/adminsService.js');

    //region Login
    app.post('/api/login', function (request, response) {
        console.log("POST /login");
        loginServices.login(request, response);
    });
    //endregion

    //region User
    app.get("/api/user", authService.verifytoken,  function (request, response) {
        console.log("GET /user");
        usersServices.getUsers(response);
    });

    app.post("/api/user", authService.verifytoken,  function (request, response) {
        console.log("POST /user");
        usersServices.createUser(request, response);
    });

    app.delete("/api/user", authService.verifytoken,  function (request, response) {
        console.log("Delete /user");
        usersServices.deleteUsers(request, response);
    });
    //endregion

    //region Look
    app.post("/api/look/cpu", authService.verifytoken,  function (request, response) {
        console.log("POST /look/cpu");
        lookServices.getCPUHistory(request, response);
    });

    app.post("/api/look/mem", authService.verifytoken,  function (request, response) {
        console.log("POST /look/mem");
        lookServices.getMemHistory(request, response);
    });

    app.post("/api/look/network", authService.verifytoken,  function (request, response) {
        console.log("POST /look/network");
        lookServices.getNetworkHistory(request, response);
    });

    app.get("/api/look/processList", authService.verifytoken,  function (request, response) {
        console.log("GET /look/processList");
        lookServices.processList(request, response);
    });

    app.get("/api/look/usersLogin", authService.verifytoken,  function (request, response) {
        console.log("GET /look/usersLogin");
        lookServices.usersLogin(request, response);
    });

    app.get("/api/look/disk", authService.verifytoken,  function (request, response) {
        console.log("GET /look/disk");
        lookServices.disk(request, response);
    });

    app.get("/api/look/uptime", authService.verifytoken,  function (request, response) {
        console.log("GET /look/uptime");
        lookServices.uptime(request, response);
    });

    app.get("/api/look/networkCons", authService.verifytoken,  function (request, response) {
        console.log("GET /look/networkCons");
        lookServices.networkCons(request, response);
    });
    //endregion

    //region Process
    app.delete("/api/look/processKiller", authService.verifytoken,  function (request, response) {
        console.log("Delete /look/processKiller");
        lookServices.processKiller(request, response);
    });
    //endregion

    //region Events
    app.get("/api/run/events", authService.verifytoken,  function (request, response) {
        console.log("GET /api/run/events");
        adminServices.getEvents(response);
    });

    app.post("/api/run/events", authService.verifytoken,  function (request, response) {
        console.log("POST /api/run/events");
        adminServices.createEvent(request, response);
    });

    app.delete("/api/run/events", authService.verifytoken,  function (request, response) {
        console.log("POST /api/run/events");
        adminServices.deleteEvent(request, response);
    });
    //endregion


};

module.exports = appRouter;
