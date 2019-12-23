var exam =require('../models/exam');

function addExam(req,res,next) {
    exam.add({type:req.body.type}).then((response)=>{
        res.setHeader('content-type','application/json');
        res.json({success:true});
    });
}

function index(req,res,next)
{
    exam.all().then((response)=>{
        res.render('HR-exams',{exams:response.result});
    });
}
function showExam(req,res,next){
    exam.findOne({eid:req.params.eid}).then((response)=>{
        res.setHeader('content-type','application/json');
        res.json(response.result);
    });
}
function updateExam(req,res,next){
    exam.update(req.params.eid,{type:req.body.type}).then((response)=>{
        res.setHeader('content-type','application/json');
        res.json({success:true});
    });
}

module.exports={
    addExam:addExam,
    showExam:showExam,
    updateExam:updateExam,
    index:index
}