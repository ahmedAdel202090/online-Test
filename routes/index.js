var express = require('express');
var router = express.Router();
var applicant = require('../controllers/ApplicantController');
var exam = require('../controllers/ExamController');
/* GET home page. */
router.get('/',applicant.showAll);
router.post('/addExam',exam.addExam);

module.exports = router;
