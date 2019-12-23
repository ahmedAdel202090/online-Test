var position = require('../models/position');


function addPosition(req,res,next)
{
    position.addPosition(req.body.name).then((response)=>{
        res.redirect('/hr-dashboard');
    });
}
module.exports = {
    addPosition:addPosition
}