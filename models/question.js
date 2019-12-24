var connection = require('../connection');

function addQ(eid, {text}) {
    return new Promise((resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("insert into question (text,eid) values ('" + text + "'," + eid + ")", con)
                .then((response) => {
                    response.end();
                    resolve({result: response.result, next: module.exports});
                });
        });
    }));
}
function deleteQ(qid) {
    return new Promise((resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("DELETE FROM question WHERE qid="+qid, con)
                .then((response) => {
                    response.end();
                    resolve({result: response.result, next: module.exports});
                });
        });
    }));
}

function selectRandQs({eid}) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT * FROM question WHERE eid=" + eid + " ORDER BY RAND() LIMIT 5", con).then((response) => {
                response.end();
                resolve({result: response.result, next: module.exports});
            });
        });
    });
}

function findOne({qid}) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT * FROM question WHERE qid=" + qid, con).then((response) => {
                response.end();
                resolve({result: response.result, next: module.exports});
            });
        });
    });
}
function all(eid) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT * FROM question WHERE eid=" + eid , con).then((response) => {
                response.end();
                resolve({result: response.result, next: module.exports});
            });
        });
    });
}

function updateQ(qid, {text}) {
    return new Promise(resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("UPDATE question SET text='" + text + "'"+" WHERE qid=" + qid, con).then((response) => {
                response.end();
                resolve({result: response.result, next: module.exports});
            });
        });
    });
}

module.exports = {
    addQ: addQ,
    findOne: findOne,
    updateQ: updateQ,
    selectRandQs: selectRandQs,
    all:all,
    deleteQ:deleteQ
}