var connection = require('../connection');

function all()
{
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT * FROM position",con).then((response)=>{
                response.end();
                resolve({result:response.result,next:module.exports});
            });
        });
    });
}

module.exports = {
    all: all
}