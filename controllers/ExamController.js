var exam =require('../models/exam');

function addExam(req,res,next) {
    exam.add({type:req.body.type}).then((response)=>{
        res.setHeader('content-type','application/json');
        res.json({success:true});
    });

}

module.exports={
    addExam:addExam
}