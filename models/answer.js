var connection = require('../connection');

function addAnswer(qid, text,correct) {
    return new Promise((resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("INSERT INTO answer (qid,text,correct) VALUES (" + qid+",'"+text + "'," + correct + ")", con)
                .then((response) => {
                    response.end();
                    resolve({result: response.result, next: module.exports});
                });
        });
    }));
}

function selectRand_IncorrectAns({qid}) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT * FROM answer WHERE qid=" + qid + " and correct="+0+" ORDER BY RAND() LIMIT 3", con)
                .then((response) => {
                response.end();
                resolve({result: response.result, next: module.exports});
            });
        });
    });
}
function selectRand_correctAns({qid}) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT * FROM answer WHERE qid=" + qid + " and correct="+1+" ORDER BY RAND() LIMIT 1", con)
                .then((response) => {
                response.end();
                resolve({result: response.result, next: module.exports});
            });
        });
    });
}

function updateAnwer(aid, qid, {text},correct) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("UPDATE answer SET text='" + text + "',qid=" + qid+ ",correct=" + correct + " WHERE aid=" + aid, con)
            .then((response) => {
                response.end();
                resolve({result: response.result, next: module.exports});
            });
        });
    });
}

function findOne(aid) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT * FROM answer WHERE aid=" + aid, con)
            .then((response) => {
                response.end();
                resolve({result: response.result, next: module.exports});
            });
        });
    });
}

function all(qid){
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT * FROM answer WHERE qid="+qid, con)
                .then((response) => {
                    response.end();
                    resolve({result: response.result, next: module.exports});
                });
        });
    });
}
function deleteAnswer(aid)
{
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("DELETE FROM answer WHERE aid="+aid, con)
                .then((response) => {
                    response.end();
                    resolve({result: response.result, next: module.exports});
                });
        });
    });
}
module.exports={
    addAnswer:addAnswer,
    selectRand_IncorrectAns:selectRand_IncorrectAns,
    selectRand_correctAns:selectRand_correctAns,
    updateAnwer:updateAnwer,
    findOne:findOne,
    all:all,
    deleteAnswer:deleteAnswer

}