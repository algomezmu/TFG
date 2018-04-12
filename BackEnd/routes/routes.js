var appRouter = function (app) {

    var authService = require('./../services/authentification.js');
    var usersServices = require('./../services/usersServices.js');
    var loginServices = require('./../services/loginService.js');

    app.get("/api/login", function (request, response) {
        console.log("GET /login");
        response.end('<html><body><h1>Hello, World!</h1></body></html>');
    });

    app.post('/api/login', function (request, response) {
        console.log("POST /login");
        loginServices.login(request, response);
        //response.end('<html><body><h1>Hello, World!</h1></body></html>');
    });

    app.put("/api/login", function (request, response) {
        console.log("PUT /users/forgotPassword");
        response.end('<html><body><h1>Hello, World!</h1></body></html>');
    });

    app.delete("/api/login", function (request, response) {
        console.log("DELETE /login");
        response.end('<html><body><h1>Hello, World!</h1></body></html>');
    });

    app.put("/api/user", authService.verifytoken,  function (request, response) {
        console.log("PUT /user");
        usersServices.createUser(request, response);
    });
};
module.exports = appRouter;
