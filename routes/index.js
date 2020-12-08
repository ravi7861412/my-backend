var express = require('express');
var router = express.Router();

const User = require('./../api/controllers/UserController');
const gamer= require('./../api/controllers/gameController');

/* Define your routes here */

router.get('/user', function(req, res, next) {
   User.getUser(req, res);
});

router.post('/create-user', function(req, res, next) {
   User.createUser(req, res);
});
router.get('/user-info',function(req,res,next) {
   User.getUserAddress(req,res);
});

router.post('/create-user-address', function(req, res, next) {
   User.createUserAddress(req, res);
});
router.post('/entry', function(req, res, next) {
   gamer.enterGame(req, res);
});

router.get('/read-all', function(req, res, next) {
   User.readAll(req, res);
});



module.exports = router;
