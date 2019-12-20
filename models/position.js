var connection = require('../connection');

function all()
{
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT * FROM position",con).then((response)=>{
                resolve({result:response.result,next:module.exports});
                response.end();
            });
        });
    });
}

module.exports = {
    all: all
}