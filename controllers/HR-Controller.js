var exam=require('../models/exam');
var applicant=require('../models/applicant');
var position =require('../models/position');
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
       res.redirect('/hr-dashboard');
    });
}
function disApprove(req,res,next){
    applicant.disApprove(req.params.email).then((response)=>{
        res.redirect('/hr-dashboard');
    });
}
module.exports={
    index:index,
    showCv:showCv,
    approve:approve,
    disApprove:disApprove
}