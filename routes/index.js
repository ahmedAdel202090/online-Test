var express = require('express');
var router = express.Router();
var applicant = require('../controllers/ApplicantController');
var exam = require('../controllers/ExamController');
/* GET home page. */
router.get('/',applicant.showAll);


/** exam  **/
router.post('/exam/add',exam.addExam);
router.get('/exam/:eid/show',exam.showExam);
router.put('/exam/:eid/update',exam.updateExam);
/** ----------------------------------**/

module.exports = router;
