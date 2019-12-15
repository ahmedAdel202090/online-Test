var express = require('express');
var router = express.Router();
var applicant = require('../controllers/ApplicantController');
/* GET home page. */
router.get('/',applicant.showAll);

module.exports = router;
