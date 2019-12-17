var connection = require('../connection');


function getSolvedQuestions(email,eid) {
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT app_ans.qid as qid FROM applicant_answers as app_ans, question as q ,answer as ans " +
                "WHERE app_ans.qid = q.qid and app_ans.aid=ans.aid and q.qid = ans.qid and ans.correct=1 and app_ans.eid="+eid+" and app_ans.email='"+email+"'",con).then((response)=>{
                resolve({result:response.result,next:module.exports});
                response.end();
            });
        });
    });
}
function getSkippedQuestions(email,eid) {
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT qid FROM applicant_answers WHERE aid IS NULL and eid="+eid+" and email='"+email+"'",con).then((response)=>{
                resolve({result:response.result,next:module.exports});
                response.end();
            });
        });
    });
}
function getMarkedQuestions(email,eid) {
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT qid FROM applicant_answers WHERE aid IS NOT NULL and eid="+eid+" and email='"+email+"'",con).then((response)=>{
                resolve({result:response.result,next:module.exports});
                response.end();
            });
        });
    });
}
function getFullTest(email,eid) {
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT q.text as question , ans.text as answer , ans.correct as correct FROM applicant_answers as app_ans, question as q ,answer as ans " +
                "WHERE app_ans.qid = q.qid and app_ans.aid=ans.aid and q.qid = ans.qid and app_ans.eid="+eid+" and app_ans.email='"+email+"'",con).then((response)=>{
                resolve({result:response.result,next:module.exports});
                response.end();
            });
        });
    });
}

module.exports={
    getSolvedQuestions:getSolvedQuestions,
    getSkippedQuestions:getSkippedQuestions,
    getMarkedQuestions:getMarkedQuestions,
    getFullTest:getFullTest
}