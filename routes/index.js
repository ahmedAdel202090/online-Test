var express = require('express');
var router = express.Router();
var applicant = require('../controllers/ApplicantController');
var exam = require('../controllers/ExamController');
/* GET home page. */
router.get('/',applicant.showAll);


/** exam  **/
router.get('/exam/show',exam.showAll);
router.post('/exam/add',exam.addExam);
router.get('/exam/:eid/show',exam.showExam);
router.put('/exam/:eid/update',exam.updateExam);
/** ----------------------------------**/

/**applicant-answers **/
router.get('/applicant/:email/exam/:eid/solvedQuestions',applicant.showSolvedQuestions);
router.get('/applicant/:email/exam/:eid/skippedQuestions',applicant.showSkippedQuestions);
router.get('/applicant/:email/exam/:eid/markedQuestions',applicant.showMarkedQuestions);
router.get('/applicant/:email/exam/:eid/fullTest',applicant.showFullTest);
/**-------------------------------------- **/

module.exports = router;
