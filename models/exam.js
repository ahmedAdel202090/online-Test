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

module.exports={
    add:add
}