var appRouter = function (app) {

    var authService = require('./../services/authentification.js');
    var usersServices = require('./../services/usersServices.js');
    var loginServices = require('./../services/loginService.js');
    var lookServices = require('./../services/lookService.js');

    app.post('/api/login', function (request, response) {
        console.log("POST /login");
        loginServices.login(request, response);
    });

    app.get("/api/user", authService.verifytoken,  function (request, response) {
        console.log("GET /user");
        usersServices.getUsers(response);
    });

    app.put("/api/user", authService.verifytoken,  function (request, response) {
        console.log("PUT /user");
        usersServices.createUser(request, response);
    });

    app.delete("/api/user", authService.verifytoken,  function (request, response) {
        console.log("Delete /user");
        usersServices.deleteUsers(request, response);
    });

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

};
module.exports = appRouter;
