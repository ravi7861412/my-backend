var express = require('express');
var router = express.Router();

const User = require('./../api/controllers/UserController');

/* Define your routes here */

router.get('/user', function(req, res, next) {
   User.getUser(req, res);
});

router.post('/create-user', function(req, res, next) {
   User.createUser(req, res);
});

router.post('/create-user-address', function(req, res, next) {
   User.createUserAddress(req, res);
});


module.exports = router;
