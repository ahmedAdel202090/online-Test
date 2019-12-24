var answer=require('../models/answer');
function showAddAnswer(req,res,next){
    answer.all(req.params.qid).then((response)=>{
       res.render('HR-addAnswer',{answers:response.result,qid:req.params.qid});
    });
}
function addAnswer(req,res,next)
{
    if(req.body.correct)
    {
        answer.addAnswer(req.body.qid,req.body.text,1).then((response)=>{
            res.redirect('/'+req.body.qid+'/showAddAnswer');
        });
    }
    else{
        answer.addAnswer(req.body.qid,req.body.text,0).then((response)=>{
            res.redirect('/'+req.body.qid+'/showAddAnswer');
        });
    }
}
function deleteAnswer(req,res,next)
{
    answer.deleteAnswer(req.params.aid).then((response)=>{
        res.redirect('/'+req.params.qid+'/showAddAnswer');

    });
}
function showEditAnswer(req,res,next)
{
    answer.findOne(req.params.aid).then((response)=>{
        res.render('HR-editAnswer',{qid:response.result[0].qid,aid:req.params.aid,text:response.result[0].text,correct:response.result[0].correct});
    })

}
function updateAnswer(req,res,next)
{
    if(req.body.correct)
    {
        answer.updateAnwer(req.body.aid,req.body.qid,{text:req.body.text},1).then((response)=>{
            res.redirect('/'+req.body.qid+'/showAddAnswer');
        });
    }
    else{
        answer.updateAnwer(req.body.aid,req.body.qid,{text:req.body.text},0).then((response)=>{
            res.redirect('/'+req.body.qid+'/showAddAnswer');
        });
    }

}
module.exports={
    showAddAnswer:showAddAnswer,
    addAnswer:addAnswer,
    deleteAnswer:deleteAnswer,
    showEditAnswer:showEditAnswer,
    updateAnswer:updateAnswer
};