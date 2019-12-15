var applicant = require('../models/applicant');

function showAll(req,res,next) {
    applicant.getAll().then((response)=>{
       res.contentType('json');
       res.send(response.result);
    });
}

module.exports={
  showAll:showAll
};