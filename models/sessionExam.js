var connection = require('../connection');

function add_Session_Exam(eid, {Applicant_email}) {
    return new Promise((resolve => {
        connection.connect().then((con) => {
            connection.excuteQuery("insert into session_exam (eid,applicant_email) values (" + eid + ",'" + Applicant_email + "')", con)
                .then((response) => {
                    response.end();
                    resolve({result: response.result, next: module.exports});
                });
        });
    }));
}
function get_applicant_exams(email) {
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT * FROM session_exam WHERE applicant_email='"+email+"'",con).then((response)=>{
                response.end();
                resolve({result:response.result,next:module.exports});
            });
        });
    });
}
module.exports = {
    add_Session_Exam: add_Session_Exam,
    get_applicant_exams:get_applicant_exams
}