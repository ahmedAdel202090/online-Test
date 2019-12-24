var question = require('../models/question');

function addQuestionShow(req,res,next) {
    question.all(req.params.eid).then((response)=>{
        res.render('HR-addQuestion',{questions:response.result,eid:req.params.eid});
    });
}
function addQ(req, res, next) {
    question.addQ(req.body.eid, {text: req.body.text}).then((response) => {
        res.redirect('/showAddQuestion/'+req.body.eid);
    });
}
function deleteQ(req,res,next) {
    question.deleteQ(req.params.qid).then((response)=>{
        res.redirect('/showAddQuestion/'+req.params.eid);
    });
}

function showQ(req, res, next) {
    question.findOne({qid: req.params.qid}).then((response) => {
        res.setHeader('content-type', 'application/json');
        res.json(response.result);
    });
}

function showUpdate(req,res,next) {
    question.findOne({qid:req.params.qid}).then((response)=>{
        res.render('HR-editQuestion',{qid:req.params.qid,eid:req.params.eid,text:response.result[0].text});
    });
}
function updateQ(req, res, next) {
    question.updateQ(req.body.qid, {text: req.body.text}).then((response) => {
        res.redirect('/showAddQuestion/'+req.body.eid);
    });
}


function selectRandQs(req, res, next) {
    question.selectRandQs({eid: req.params.eid}).then((response) => {
        res.setHeader('content-type', 'application/json');
        res.json(response.result);
    });
}


module.exports = {
    addQ: addQ,
    showQ: showQ,
    updateQ: updateQ,
    selectRandQs:selectRandQs,
    addQuestionShow:addQuestionShow,
    deleteQ:deleteQ,
    showUpdate:showUpdate
}
