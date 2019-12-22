var connection = require('../connection');

function add({text,email,for_applicant}){
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("insert into notification (email,text,for_applicant) values ('"+email+"','"+text+"',"+for_applicant+")",con).then((response)=>{
                resolve({result:response.result,next:module.exports});
                response.end();
            });
        });
    });
}
function all({for_applicant})
{
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT * FROM notification WHERE for_applicant="+for_applicant,con).then((response)=>{
                resolve({result:response.result,next:module.exports});
                response.end();
            });
        });
    });
}
function findOne({nid})
{
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT * FROM notification WHERE nid="+nid,con).then((response)=>{
                resolve({result:response.result,next:module.exports});
                response.end();
            });
        });
    });
}
module.exports={
    add:add,
    all:all,
    findOne:findOne
}