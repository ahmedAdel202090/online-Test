var sessionExam = require('../models/sessionExam');

function add_Session_Exam(req, res, next) {

    sessionExam.add_Session_Exam(req.body.eid, {Applicant_email: req.body.Applicant_email}).then((response) => {
        res.setHeader('content-type', 'application/json');
        res.json({success: true});
    });
}


module.exports = {
    add_Session_Exam: add_Session_Exam
}