var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/partial/:name', function(req, res, next) {
  var name = req.params.name;
  res.render('partials/' + name);
});
router.get('/partial/rooms/:name', function(req, res, next) {
  var name = req.params.name;
  res.render('partials/' + name);
});

module.exports = router;
