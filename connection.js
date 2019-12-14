var mysql= require('mysql');
var con=mysql.createConnection({host:'localhost',user:'root',password:'',database:'online_test'});
var connect = function () {
    return new Promise(((resolve, reject) => {
        con.connect(function (err) {
            if (err)
                reject(err);
            console.log('connected');
            resolve(con);
        });
    }));
}
var excuteQuery= function(query='',con=module.exports.con) {
    return new Promise((resolve, reject) => {
        con.query(query, function (err, result, fields) {
            if (err)
                reject(err);
            resolve({result:result,next:module.exports.excuteQuery,destroy:function () {
                    module.exports.con.destroy()
                }});
        });

    });
}

module.exports={
    con:con,
    connect:connect,
    excuteQuery:excuteQuery
}
