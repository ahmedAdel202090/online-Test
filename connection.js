var mysql= require('mysql');
var connect = function () {
    return new Promise(((resolve, reject) => {
        module.exports.con=mysql.createConnection({host:'localhost',user:'root',password:'',database:'online_test'});
        module.exports.con.connect(function (err) {
            if (err)
                reject(err);
            console.log('connected');
            resolve(module.exports.con);
        });
    }));
}
var excuteQuery= function(query='',con=module.exports.con) {
    return new Promise((resolve, reject) => {
        con.query(query, function (err, result, fields) {
            if (err)
                reject(err);
            resolve({result:result,next:module.exports.excuteQuery,end:function () {
                    module.exports.con.end();
                }});
        });

    });
}

module.exports={
    con:null,
    connect:connect,
    excuteQuery:excuteQuery
}
