var exam=require('../models/exam');
var applicant=require('../models/applicant');
var position =require('../models/position');
var sessionExam=require('../models/sessionExam');
var fs=require('fs');
function index(req,res,next) {
    position.all().then((response)=>{
        applicant.getAllPending().then((response2)=>{
            res.render('HR-main',{positions:response.result,pendings:response2.result});
        })
    });
}

function showCv(req,res,next)
{
    applicant.findOne(req.params.email).then((response)=>{
        var path=response.result[0].cv;
        fs.readFile(path , function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });
    });
}
function approve(req,res,next){
    applicant.approve(req.params.email).then((response)=>{
       res.redirect('/assignexams/'+req.params.email);
    });
}
function disApprove(req,res,next){
    applicant.disApprove(req.params.email).then((response)=>{
        res.redirect('/hr-dashboard');
    });
}

function showAssignExams(req,res,next)
{
    exam.all().then((response)=>{
       res.render('HR-assignExams',{exams:response.result,email:req.params.email});
    });
}
function assignExams(req,res,next)
{

    values=[];
    for(var i in req.body.exams)
    {
        var date=new Date(req.body.exams[i][1]);
        values.push([req.body.exams[i][0],req.body.email,date])
    }
    sessionExam.add_Session_Exam(values).then((response)=>{
        res.redirect('/hr-dashboard');
    });
}
module.exports={
    index:index,
    showCv:showCv,
    approve:approve,
    disApprove:disApprove,
    showAssignExams:showAssignExams,
    assignExams:assignExams
}