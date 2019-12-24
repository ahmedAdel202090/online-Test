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
function addPosition(name) {
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("INSERT INTO position (name) values ('"+name+"')",con).then((response)=>{
                response.end();
                return response.result;
            }).then((result)=>{
                resolve({result:result,next:module.exports});

            });
        });
    });
}
function applicantApplyPosition(email,pid)
{
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("insert into candidate_to (email,pid) values ('" + email + "'," + pid +")",con).then((response)=>{
                response.end();
                return response.result;
            }).then((result)=>{
                resolve({result:result,next:module.exports});

            });
        });
    });
}
function getPostions()
{
    return new Promise( resolve => {
        connection.connect().then((con)=>{
            connection.excuteQuery("SELECT p.pid as pid,p.name as name,c.pid as candidate_pid,c.email as email,c.is_accepted as is_accepted,c.is_approved as is_approved FROM position as p LEFT JOIN candidate_to as c ON p.pid=c.pid",con).then((response)=>{
                console.log(response.result);
                response.end();
                return response.result;
            }).then((result)=>{
                resolve({result:result,next:exports.module});
            });
        });
    });
}
module.exports = {
    all: all,
    applicantApplyPosition:applicantApplyPosition,
    getPostions:getPostions,
    addPosition:addPosition
}