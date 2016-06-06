'use strict';

var passport = require('passport');

module.exports = function(router) {

  router.post('/', function(req, res, next) {

    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        res.status(403);
        return res.json({"error": info});
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        console.log('user', user);
        console.log('info', info);
        res.json({"success": info});
        // TODO: Do not send info
      });
    })(req, res, next);
  });
}
