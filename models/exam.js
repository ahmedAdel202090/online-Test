var connection = require('../connection');

function add({type}) {
    return new Promise((resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("insert into exam (type) values ('"+type+"')",con)
                .then((response)=>{
                    response.end();
                    resolve({result:response.result,next:module.exports});
                });
        });
    }));
}
function all()
{
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT * FROM exam",con).then((response)=>{
                response.end();
                resolve({result:response.result,next:module.exports});
            });
        });
    });
}
function findOne({eid})
{
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT * FROM exam WHERE eid="+eid,con).then((response)=>{
                response.end();
                resolve({result:response.result,next:module.exports});  
            });
        });
    });
}

function update(eid,{type})
{
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("UPDATE exam SET type='"+type+"' WHERE eid="+eid,con).then((response)=>{
                response.end();
                resolve({result:response.result,next:module.exports});
            });
        });
    });
}

module.exports={
    add:add,
    findOne:findOne,
    update,update,
    all:all
}