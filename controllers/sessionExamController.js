var sessionExam = require('../models/sessionExam');
var question = require('../models/question');
var applicantAnswers = require('../models/applicant_answers');
var applicant = require('../models/applicant');

function add_Session_Exam(req, res, next) {
    sessionExam.add_Session_Exam(req.body.eid, {Applicant_email: req.body.Applicant_email}).then((response) => {
        var all_rows=[];
        question.selectRandQs({eid:req.body.eid}).then((response1) => {
            for (var i = 0; i < response1.result.length; i++) {
                var row =[];
                row.push(req.body.Applicant_email);
                row.push(response1.result[i].qid);
                row.push(req.body.eid);
                all_rows.push(row);
            }
            applicantAnswers.insert_exam_qs_for_candidate(all_rows);
        });
        res.setHeader('content-type', 'application/json');
        res.json({success: true});
        res.end();
    });

}

function show_summerized_report(req, res, next) {
    sessionExam.get_applicant_exams(req.params.email).then((response) => {
        var total_solved = 0;
        var total_marked = 0;
        var total_skipped = 0;
        for (var i = 0; i < response.result.length && response.result[i].is_taken == 1; i++) {
            total_solved += response.result[i].solved;
            total_marked += response.result[i].marked;
            total_skipped += response.result[i].skipped;
        }
        var total = {total_skipped: total_skipped, total_solved: total_solved, total_marked: total_marked};
        applicant.findOne_by_email(req.params.email).then((response2)=>{
            res.render('HR-candidateProfile',{exams:response.result,total_results:total,identity:response2.result[0]});
        })
    });
}


module.exports = {
    add_Session_Exam: add_Session_Exam,
    show_summerized_report: show_summerized_report
}