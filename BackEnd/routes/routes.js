var appRouter = function (app) {

    var usersServices = require('./../services/usersServices.js');

    app.get("/login", function (request, response) {
        console.log("GET /login");
        response.end('<html><body><h1>Hello, World!</h1></body></html>');
    });

    app.post('/login', function (request, response, next) {
        console.log("POST /login");
        response.end('<html><body><h1>Hello, World!</h1></body></html>');
    });

    app.put("/login", function (request, response) {
        console.log("PUT /users/forgotPassword");
        response.end('<html><body><h1>Hello, World!</h1></body></html>');
    });

    app.delete("/login", function (request, response) {
        console.log("DELETE /login");
        response.end('<html><body><h1>Hello, World!</h1></body></html>');
    });
}
module.exports = appRouter;
