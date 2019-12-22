var connection= require('../connection');

function getAll() {
    return new Promise((resolve) => {
        connection.connect().then((con)=>{
            connection.excuteQuery('select * from applicant',con)
                .then((response)=>{
                    response.end();
                    resolve({result:response.result , next:module.exports});
                });
        }).catch((err) =>{
            console.log(err);
        });
    });
}

function insertApplicant(email,cv,name,phoneNum,password){
    return new Promise((resolve) => {
        connection.connect().then((con)=>{
            connection.excuteQuery("INSERT INTO applicant (email,name,phone_num,password) VALUES('"+email+"','"+cv+"','"+name+"','"+phoneNum+"','"+password+"')",con)
                .then((response)=>{
                    response.end();
                    resolve({result:response.result , next:module.exports});
                });
        }).catch((err) =>{
            console.log(err);
        });
    }); 
}

function validateApplicant(email){
    return new Promise((resolve) => {
        connection.connect().then((con)=>{
            connection.excuteQuery("select * from applicant where email='"+email+"'",con)
                .then((response)=>{
                    response.end();
                    resolve({result:response.result , next:module.exports});
                });
        }).catch((err) =>{
            console.log(err);
        });
    }); 
}

function login(email,password){
    return new Promise((resolve) => {
        connection.connect().then((con)=>{
            connection.excuteQuery("select * from applicant where email='"+email+"' and password='"+password+"'",con)
                .then((response)=>{
                    response.end();
                    resolve({result:response.result , next:module.exports});
                });
        }).catch((err) =>{
            console.log(err);
        });
    }); 
}

module.exports={
    getAll:getAll,
    insertApplicant:insertApplicant,
    validateApplicant:validateApplicant,
    login:login,

}