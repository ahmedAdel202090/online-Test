var express = require('express');
var router = express.Router();
var applicant = require('../controllers/ApplicantController');
var exam = require('../controllers/ExamController');
var question = require('../controllers/questionController');
var position = require('../controllers/positionController');
var sessionExam= require('../controllers/sessionExamController');
var hr=require('../controllers/HR-Controller');
/* GET home page. */
router.get('/',function (req,res,next) {
    res.render('index');
});

/**applicant view**/
router.post('/validate-candidate',applicant.validateEmail);
router.get('/candidate-dashboard',applicant.index);
router.get('/signin-applicant',applicant.showLogin);
router.post('/applicant-login',applicant.login);
router.get('/applicant/:email/apply/:pid',applicant.applyPosition);
router.get('/signup-applicant',applicant.showSignUp);
router.post('/register-applicant',applicant.signup);


router.get('/logout',applicant.logout);
/**---------------------------------------**/

/**HR**/
router.get('/hr-dashboard',hr.index);
router.post('/addPosition',position.addPosition);
router.get('/applicant/:email/cv',hr.showCv);
router.get('/applicant/:email/approve',hr.approve);
router.get('/applicant/:email/disapprove',hr.disApprove);
/**----------------------**/

/**HR Exams **/
router.get('/hrExams',exam.index);
/**--------------------------- **/
router.get('/header',function (req,res,next) {
    res.render('header');
});
router.get('/notifications',function (req,res,next) {
    res.render('notifications');
});




router.get('/editExam',function (req,res,next) {
    res.render('HR-editExam');
});

router.get('/hrCandidates',function (req,res,next) {
    res.render('HR-candidates');
});


router.get('/hrCandidateExamPage',function (req,res,next) {
    res.render('HR-candidateExamPage');
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


router.get('/CandidateExamPage',function (req,res,next) {
    res.render('Candidate-examPage');
});


/** exam  **/
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
