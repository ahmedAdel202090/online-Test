var express = require('express');
var router = express.Router();
var applicant = require('../controllers/ApplicantController');
var exam = require('../controllers/ExamController');
var question = require('../controllers/questionController');
var position = require('../controllers/positionController');
var sessionExam= require('../controllers/sessionExamController');
/* GET home page. */
router.get('/',applicant.showAll);


/** exam  **/
router.get('/exam/show',exam.showAll);
router.post('/exam/add',exam.addExam);
router.get('/exam/:eid/show',exam.showExam);
router.put('/exam/:eid/update',exam.updateExam);
/** ----------------------------------**/

/** question  **/
router.post('/question/addQ',question.addQ);
router.get('/question/:qid/show',question.showQ);
router.get('/question/:eid/selectRandQs',question.selectRandQs);
router.put('/question/:qid/update',question.updateQ);
/** ----------------------------------**/

/** position  **/

router.get('/position/showAll',position.showAll);

/** ----------------------------------**/


/** sessionExam  **/

router.post('/sessionExam/add',sessionExam.add_Session_Exam);

/** ----------------------------------**/


/**applicant-answers **/
router.get('/applicant/:email/exam/:eid/solvedQuestions',applicant.showSolvedQuestions);
router.get('/applicant/:email/exam/:eid/skippedQuestions',applicant.showSkippedQuestions);
router.get('/applicant/:email/exam/:eid/markedQuestions',applicant.showMarkedQuestions);
router.get('/applicant/:email/exam/:eid/fullTest',applicant.showFullTest);
/**-------------------------------------- **/

module.exports = router;
