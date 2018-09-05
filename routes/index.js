var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DiraWeb' });
});
router.post('/',function(req,res,next) {
  if (req.body.password=='dab42'){
    res.redirect(307,'webentry');
  }
  else {
    res.render('index', { title: 'DiraWeb' });
  }
});

module.exports = router;
