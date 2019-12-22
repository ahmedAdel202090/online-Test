var express = require('express');
var router = express.Router();
var applicant = require('../controllers/ApplicantController');
var exam = require('../controllers/ExamController');
var question = require('../controllers/questionController');
var position = require('../controllers/positionController');
var sessionExam= require('../controllers/sessionExamController');
/* GET home page. */
router.get('/',function (req,res,next) {
    res.render('signin',{title:['Welcome','hello','dasd']});
});
router.get('/signup',function (req,res,next) {
    res.render('signup');
});
router.get('/header',function (req,res,next) {
    res.render('header');
});
router.get('/notifications',function (req,res,next) {
    res.render('notifications');
});

router.get('/hrApplicants',function (req,res,next) {
    res.render('HR-main');
});

router.get('/hrExams',function (req,res,next) {
    res.render('HR-exams');
});

router.get('/editExam',function (req,res,next) {
    res.render('HR-editExam');
});

router.get('/hrCandidates',function (req,res,next) {
    res.render('HR-candidates');
});

router.get('/hrCandidateProfile',function (req,res,next) {
    res.render('HR-candidateProfile');
});

router.get('/hrAddExam',function (req,res,next) {
    res.render('HR-addExam');
});

router.get('/candidateExams',function (req,res,next) {
    res.render('Candidate-allExams');
});

router.get('/CandidateAvaPositions',function (req,res,next) {
    res.render('Candidate-avaPositions');
});

router.get('/CandidateExamPage',function (req,res,next) {
    res.render('Candidate-examPage');
});


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
router.get('/sessionExam/show_summerized_report/:email',sessionExam.show_summerized_report);
router.post('/sessionExam/add',sessionExam.add_Session_Exam);

/** ----------------------------------**/


/**applicant-answers **/
router.get('/applicant/:email/exam/:eid/solvedQuestions',applicant.showSolvedQuestions);
router.get('/applicant/:email/exam/:eid/skippedQuestions',applicant.showSkippedQuestions);
router.get('/applicant/:email/exam/:eid/markedQuestions',applicant.showMarkedQuestions);
router.get('/applicant/:email/exam/:eid/fullTest',applicant.showFullTest);
router.put('/applicant/update_ans_of_candidate',applicant.update_ans_of_candidate)
/**-------------------------------------- **/

module.exports = router;
