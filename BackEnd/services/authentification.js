
var authSecret = require('./../config/config');
var jwt    = require('jsonwebtoken');

//Auth verify
function verifytokenAdmin(req, res, next){
    var token = req.get('Authorization');

    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, authSecret.jwt_secret_admin, function(err, decoded) {
            if (err) {
                res.json({ "status": "error", "code": "401",  "message": 'Failed to authenticate token.' });
            } else {
                req.rol = decoded.rol;
                next();
            }
        });
    }else{
        res.json({ "status": "error", "code": "401", "message": 'Failed to authenticate token.' });
    }
}

//Auth verify
function verifytokenAll(req, res, next){
    var token = req.get('Authorization');

    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, authSecret.jwt_secret_admin, function(err, decoded) {
            if (err) {
                jwt.verify(token, authSecret.jwt_secret_monitor, function(err, decoded) {
                    if (err) {
                        res.json({ "status": "error", "code": "401",  "message": 'Failed to authenticate token.' });
                    } else {
                        req.rol = decoded.rol;
                        next();
                    }
                });
            } else {
                req.rol = decoded.rol;
                next();
            }
        });
    }else{
        res.json({ "status": "error", "code": "401", "message": 'Failed to authenticate token.' });
    }
}

exports.verifytokenAdmin = verifytokenAdmin;
exports.verifytokenAll = verifytokenAll;