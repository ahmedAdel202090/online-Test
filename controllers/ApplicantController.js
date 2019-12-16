var applicant = require('../models/applicant');
var applicant_answers=require('../models/applicant_answers');

function showAll(req,res,next) {
    applicant.getAll().then((response)=>{
       res.contentType('json');
       res.send(response.result);
    });
}

function showSolvedQuestions(req,res,next)
{
    applicant_answers.getSolvedQuestions(req.params.email,req.params.eid).then((response)=>{
        res.contentType('json');
        res.send(response.result);
    });
}

function showSkippedQuestions(req,res,next)
{
    applicant_answers.getSkippedQuestions(req.params.email,req.params.eid).then((response)=>{
        res.contentType('json');
        res.send(response.result);
    });
}
function showMarkedQuestions(req,res,next)
{
    applicant_answers.getMarkedQuestions(req.params.email,req.params.eid).then((response)=>{
        res.contentType('json');
        res.send(response.result);
    });
}
function showFullTest(req,res,next)
{
    applicant_answers.getFullTest(req.params.email,req.params.eid).then((response)=>{
        res.contentType('json');
        res.send(response.result);
    });
}
module.exports={
    showAll:showAll,
    showSolvedQuestions:showSolvedQuestions,
    showSkippedQuestions:showSkippedQuestions,
    showMarkedQuestions:showMarkedQuestions,
    showFullTest:showFullTest
};