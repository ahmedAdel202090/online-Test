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

module.exports={
    getAll:getAll
}