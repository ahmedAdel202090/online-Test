var connection = require('../connection');

function add_Session_Exam(eid, {Applicant_email}) {
    return new Promise((resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("insert into session_exam (eid,applicant_email) values (" + eid + ",'" + Applicant_email + "')", con)
                .then((response) => {
                    resolve({result: response.result, next: module.exports});
                    response.end();
                });
        });
    }));
}

module.exports = {
    add_Session_Exam: add_Session_Exam
}