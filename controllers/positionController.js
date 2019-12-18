var position = require('../models/position');

function showAll(req,res,next)
{
    position.all().then((response)=>{
        res.setHeader('content-type','application/json');
        res.json(response.result);
    });
}

module.exports = {
    showAll: showAll
}