var connection = require('../connection');

function addQ(eid, {text}) {
    return new Promise((resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("insert into question (text,eid) values ('" + text + "'," + eid + ")", con)
                .then((response) => {
                    resolve({result: response.result, next: module.exports});
                    response.end();
                });
        });
    }));
}

function selectRandQs({eid}) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT * FROM question WHERE eid=" + eid + " ORDER BY RAND() LIMIT 5", con).then((response) => {
                resolve({result: response.result, next: module.exports});
                response.end();
            });
        });
    });
}

function findOne({qid}) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT * FROM question WHERE qid=" + qid, con).then((response) => {
                resolve({result: response.result, next: module.exports});
                response.end();
            });
        });
    });
}

function updateQ(qid, eid, {text}) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("UPDATE question SET text='" + text + "',eid=" + eid + " WHERE qid=" + qid, con).then((response) => {
                resolve({result: response.result, next: module.exports});
                response.end();
            });
        });
    });
}

module.exports = {
    addQ: addQ,
    findOne: findOne,
    updateQ: updateQ,
    selectRandQs: selectRandQs
}