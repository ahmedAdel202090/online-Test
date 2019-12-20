var connection = require('../connection');


function update_ans_of_candidate(email, eid, qid, aid) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("UPDATE applicant_answers SET aid=" + aid + " WHERE eid=" + eid + " and email='" + email + "' and qid=" + qid, con).then((response) => {
                resolve({result: response.result, next: module.exports});
                response.end();
            });
        });
    });
}

function insert_exam_qs_for_candidate(values) {
    return new Promise((resolve => {
        connection.connect().then((con) => {
            connection.con.query("insert into applicant_answers (email,qid,eid) values ?", [values],function(err,result){
                if (err)
                    console.log(err);
                resolve({result:result});
                connection.con.end();
            });
        });
    }));
}

function getSolvedQuestions(email, eid) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT app_ans.qid as qid FROM applicant_answers as app_ans, question as q ,answer as ans " +
                "WHERE app_ans.qid = q.qid and app_ans.aid=ans.aid and q.qid = ans.qid and ans.correct=1 and app_ans.eid=" + eid + " and app_ans.email='" + email + "'", con).then((response) => {
                resolve({result: response.result, next: module.exports});
                response.end();
            });
        });
    });
}

function getSkippedQuestions(email, eid) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT qid FROM applicant_answers WHERE aid IS NULL and eid=" + eid + " and email='" + email + "'", con).then((response) => {
                resolve({result: response.result, next: module.exports});
                response.end();
            });
        });
    });
}

function getMarkedQuestions(email, eid) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT qid FROM applicant_answers WHERE aid IS NOT NULL and eid=" + eid + " and email='" + email + "'", con).then((response) => {
                resolve({result: response.result, next: module.exports});
                response.end();
            });
        });
    });
}

function getFullTest(email, eid) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT q.text as question , ans.text as answer , ans.correct as correct FROM applicant_answers as app_ans, question as q ,answer as ans " +
                "WHERE app_ans.qid = q.qid and app_ans.aid=ans.aid and q.qid = ans.qid and app_ans.eid=" + eid + " and app_ans.email='" + email + "'", con).then((response) => {
                resolve({result: response.result, next: module.exports});
                response.end();
            });
        });
    });
}

module.exports = {
    getSolvedQuestions: getSolvedQuestions,
    getSkippedQuestions: getSkippedQuestions,
    getMarkedQuestions: getMarkedQuestions,
    getFullTest: getFullTest,
    update_ans_of_candidate: update_ans_of_candidate,
    insert_exam_qs_for_candidate: insert_exam_qs_for_candidate
}