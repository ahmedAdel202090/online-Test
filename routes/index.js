var express = require('express');
var router = express.Router();
var applicant = require('../models/applicant');
/* GET home page. */
router.get('/', function(req, res, next) {
  applicant.getAll().then((res)=>{
    console.log(res.result);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
