var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/',function(req,res,next){
    if (req.body.password!='dab42'){
      res.redirect(307,'/');
    }
    res.render('webentry',{title: 'webentry'});
});

module.exports = router;
