const express = require('express')
const studregistermodel = require('../models/Registerstdnt')
const StudentRegRouter=express.Router()
StudentRegRouter.use(express.static('./public'))


StudentRegRouter.get('/studreg',function(req,res){
    res.render('fgfg')
    StudentRegRouter.post('/studregadd',function (req,res){
        const data={
            firstname:req.body.fname,
            lastname:req.body.lname,
            regno:req.body.regnbr,
            department:req.body.dpmnt,
            year:req.body.year,
            dateofbirth:req.body.dob,
            gender:req.body.gender,
            phone:req.body.phn,
            email:req.body.email,
            password:req.body.pswd,
            confirmpassword:req.body.cpswd
    
    
        }
        studregistermodel(data).save().then((data)=>{
            console.log(data);
        
            })
        })
        
     })
    
    module.exports=studregistermodel
    
    