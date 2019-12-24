var connection = require('../connection');

function add_Session_Exam(values) {
    return new Promise((resolve => {
        connection.connect().then((con) => {
            connection.con.query("insert into session_exam (eid,applicant_email,deadline) values ?", [values],function(err,result){
                if (err)
                    console.log(err);
                resolve({result:result});
                connection.con.end();
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