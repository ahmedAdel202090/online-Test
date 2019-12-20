var question = require('../models/question');

function addQ(req, res, next) {

    question.addQ(req.body.eid, {text: req.body.text}).then((response) => {
        res.setHeader('content-type', 'application/json');
        res.json({success: true});
    });
}

function showQ(req, res, next) {
    question.findOne({qid: req.params.qid}).then((response) => {
        res.setHeader('content-type', 'application/json');
        res.json(response.result);
    });
}
function updateQ(req, res, next) {
    question.updateQ(req.params.qid, req.body.eid, {text: req.body.text}).then((response) => {
        res.setHeader('content-type', 'application/json');
        res.json({success: true});
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
    selectRandQs:selectRandQs
}
