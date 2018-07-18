
var authSecret = require('./../config/config');
var jwt    = require('jsonwebtoken');

//Auth verify
function verifytoken(req, res, next){
    var token = req.get('Authorization');

    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, authSecret.jwt_secret, function(err, decoded) {
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

exports.verifytoken = verifytoken;