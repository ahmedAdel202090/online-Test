var applicant = require('../models/applicant');
var applicant_answers=require('../models/applicant_answers');
var applicant=require('../models/applicant');
var position =require('../models/position');
function index(req,res,next)
{
    if(req.session.user)
    {
        position.getPostions().then((response)=>{
            var myResults=[];
            var result=response.result;
            for(var i=0;i<result.length;i++)
            {
                let record={name:result[i].name,pid:result[i].pid,email:req.session.user,state:null};
                if(result[i].candidate_pid==null)
                {
                    record.state='apply';
                }
                else if(result[i].is_approved==-1)
                {
                    record.state='pending';
                }
                else if(result[i].is_approved==1 && result[i].is_accepted==-1)
                {
                    record.state='approved';
                }
                else if(result[i].is_accepted==1)
                {
                    record.state='accepted';
                }
                else
                {
                    record.state='rejected';
                }
                myResults.push(record);
            }
           res.render('Candidate-avaPositions',{positions:myResults});
        });
    }
    else
    {
        res.redirect('/signin-applicant')
    }
}
function showLogin(req,res,next) {
    if(!req.session.user)
    {
        res.render('signin');
    }
    res.redirect('/candidate-dashboard');
}
function validateEmail(req,res,next) {
    applicant.validateApplicant(req.body.email).then((response) => {
        res.contentType('json');
        if (response.result.length <= 0) {
            res.json({existed: false});
        } else {
            res.json({existed: true});
        }
    });
}
function showSignUp(req,res,next) {
    if(!req.session.user)
    {
        res.render('signup');
    }
    res.redirect('/candidate-dashboard');
}
function signup(req,res,next) {
    console.log(req.files);
    if(req.files)
    {
        var file=req.files.cv;
        var filename=file.name;
        var file_content=filename.split('.');
        var path='./CVs/'+file_content[0]+Math.random()*10000+'.'+file_content[1];
        file.mv(path,function (err) {
            if(err)
            {
                console.log('ewww');
                res.redirect('/signup-applicant');
            }
            else
            {
                applicant.insertApplicant(req.body.email,path,req.body.name,req.body.phoneNum,req.body.password).then((response)=>{
                    res.redirect('/signin-applicant');
                });
            }
        });
    }
    else
    {
        console.log('file problem');
        res.redirect('/signup-applicant');
    }
}
function login(req,res,next) {
    if(!req.session.user)
    {
        applicant.loginValidate(req.body.email,req.body.password).then((response)=>{
            if(response.result.length>0)
            {
                console.log('hello 3');
                console.log(response.result);
                req.session.user=req.body.email; //setup new session
                res.redirect('/candidate-dashboard');
            }
            else
            {
                res.redirect('/signin-applicant');
            }
        });
    }
    else {
        if(req.session.user==req.body.email)
        {
            res.redirect('/candidate-dashboard');
        }
        else
        {
            res.redirect('/signin-applicant');
        }
    }
}
function logout(req,res,next) {
    req.session.destroy();
    res.redirect('/signin-applicant');
}

function applyPosition(req,res,next) {
    position.applicantApplyPosition(req.params.email,req.params.pid).then((response)=>{
        res.redirect('/candidate-dashboard');
    });
}

function update_ans_of_candidate(req,res,next)
{
    applicant_answers.update_ans_of_candidate(req.body.email,req.body.eid,req.body.qid,req.body.aid).then((response)=>{
        res.setHeader('content-type','application/json');
        res.json({success:true});
    });
}


function showSolvedQuestions(req,res,next)
{
    applicant_answers.getSolvedQuestions(req.params.email,req.params.eid).then((response)=>{
        res.contentType('json');
        res.send(response.result);
    });
}

function showSkippedQuestions(req,res,next)
{
    applicant_answers.getSkippedQuestions(req.params.email,req.params.eid).then((response)=>{
        res.contentType('json');
        res.send(response.result);
    });
}
function showMarkedQuestions(req,res,next)
{
    applicant_answers.getMarkedQuestions(req.params.email,req.params.eid).then((response)=>{
        res.contentType('json');
        res.send(response.result);
    });
}
function showFullTest(req,res,next)
{
    applicant_answers.getFullTest(req.params.email,req.params.eid).then((response)=>{
        res.contentType('json');
        res.send(response.result);
    });
}
module.exports={
    showSolvedQuestions:showSolvedQuestions,
    showSkippedQuestions:showSkippedQuestions,
    showMarkedQuestions:showMarkedQuestions,
    showFullTest:showFullTest,
    update_ans_of_candidate:update_ans_of_candidate,
    signup:signup,
    login:login,
    logout:logout,
    index:index,
    showLogin:showLogin,
    validateEmail:validateEmail,
    showSignUp:showSignUp,
    applyPosition:applyPosition
};