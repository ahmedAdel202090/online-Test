var exam = require('../models/exam');

function addExam(req, res, next) {
    exam.add({type: req.body.type}).then((response) => {
        res.setHeader('content-type', 'application/json');
        res.json({success: true});
    });
}

function index(req, res, next) {
    exam.all().then((response) => {
        res.render('HR-exams', {exams: response.result});
    });
}

function searchExamByType(req, res, next) {
    exam.findByType(req.body.type).then((response) => {
        res.render('HR-exams', {exams: response.result});
    });
}

function showExam(req, res, next) {
    exam.findOne({eid: req.params.eid}).then((response) => {
        res.setHeader('content-type', 'application/json');
        res.json(response.result);
    });
}

function updateExam(req, res, next) {
    exam.update(req.params.eid, {type: req.body.type}).then((response) => {
        res.setHeader('content-type', 'application/json');
        res.json({success: true});
    });
}

function showAddExam(req, res, next) {
    res.render('HR-addExam');
}

function addExam(req, res, next) {
    exam.add({type: req.body.type, name: req.body.name}).then((response) => {
        res.redirect('/hrExams');
    });
}
function deleteExam(req,res,next)
{
    exam.deleteExam(req.params.eid).then((response)=>{
        res.redirect('/hrExams');
    });
}
function showEditExam(req,res,next)
{
    exam.findOne({eid:req.params.eid}).then((response)=>{
        res.render('HR-editExam',{eid:req.params.eid,exam_type:response.result[0].type});
    });
}
function updateExam(req,res,next){
    exam.update(req.body.eid,{type:req.body.type}).then((response)=>{
        res.redirect('/hrExams');
    });
}
module.exports = {
    addExam: addExam,
    showExam: showExam,
    updateExam: updateExam,
    index: index,
    searchExamByType: searchExamByType,
    showAddExam: showAddExam,
    deleteExam:deleteExam,
    showEditExam:showEditExam,
    updateExam:updateExam
}