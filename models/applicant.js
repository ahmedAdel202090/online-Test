var connection = require('../connection');

function getAllPending() {
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("select ap.name as name,ap.email as email,ap.cv as cv,p.name as position from applicant as ap,candidate_to as c,position as p where ap.email=c.email and p.pid=c.pid and c.is_approved=-1", con)
                .then((response) => {
                    response.end();
                    resolve({result: response.result, next: module.exports});
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}

function get_all_cand_approved_not_accepted() {
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("select ap.name as name,ap.email as email,p.name as position from applicant as ap,candidate_to as c,position as p where ap.email=c.email and p.pid=c.pid and c.is_approved=1 and c.is_accepted=-1", con)
                .then((response) => {
                    response.end();
                    resolve({result: response.result, next: module.exports});
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}

function insertApplicant(email, cv, name, phoneNum = '', password) {
    if (phoneNum == null || phoneNum == undefined) {
        phoneNum = '';
    }
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("INSERT INTO applicant (email,cv,name,phone_num,password) VALUES ('" + email + "','" + cv + "','" + name + "','" + phoneNum + "','" + password + "')", con)
                .then((response) => {
                    resolve({result: response.result, next: module.exports});
                    response.end();
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}

function validateApplicant(email) {
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("select * from applicant where email='" + email + "'", con)
                .then((response) => {
                    response.end();
                    resolve({result: response.result, next: module.exports});
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}

function loginValidate(email, password) {
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("select * from applicant where email='" + email + "' and password='" + password + "'", con)
                .then((response) => {
                    resolve({result: response.result, next: module.exports});
                    response.end();
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}

function findOne(name) {
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT ap.name as name,ap.email as email,p.name as position from applicant as ap  join candidate_to as c on ap.email=c.email join position as p on p.pid=c.pid WHERE c.is_approved=1 and c.is_accepted=-1 and ap.name='"+name+"'", con)
                .then((response) => {
                    resolve({result: response.result, next: module.exports});
                    response.end();
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}

function findOne_by_email(email) {
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("SELECT ap.name as name,ap.email as email,p.name as position from applicant as ap  join candidate_to as c on ap.email=c.email join position as p on p.pid=c.pid WHERE c.is_approved=1 and c.is_accepted=-1 and ap.email='"+email+"'", con)
                .then((response) => {
                    resolve({result: response.result, next: module.exports});
                    response.end();
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}



function approve(email) {
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("UPDATE candidate_to SET is_approved=1 WHERE email='" + email + "'", con)
                .then((response) => {
                    resolve({result: response.result, next: module.exports});
                    response.end();
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}

function disApprove(email) {
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("UPDATE candidate_to SET is_approved=0 WHERE email='" + email + "'", con)
                .then((response) => {
                    resolve({result: response.result, next: module.exports});
                    response.end();
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}

function accept(email) {
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("UPDATE candidate_to SET is_accepted=1 WHERE email='" + email + "'", con)
                .then((response) => {
                    resolve({result: response.result, next: module.exports});
                    response.end();
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}

function unaccept(email) {
    return new Promise((resolve) => {
        connection.connect().then((con) => {
            connection.excuteQuery("UPDATE candidate_to SET is_accepted=0 WHERE email='" + email + "'", con)
                .then((response) => {
                    resolve({result: response.result, next: module.exports});
                    response.end();
                });
        }).catch((err) => {
            console.log(err);
        });
    });
}

module.exports = {
    getAllPending: getAllPending,
    insertApplicant: insertApplicant,
    validateApplicant: validateApplicant,
    loginValidate: loginValidate,
    findOne: findOne,
    approve: approve,
    disApprove: disApprove,
    accept: accept,
    unaccept: unaccept,
    get_all_cand_approved_not_accepted: get_all_cand_approved_not_accepted,
    findOne_by_email:findOne_by_email
}