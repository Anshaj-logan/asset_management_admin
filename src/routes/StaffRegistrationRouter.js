const express = require('express')
const registermodel = require('../models/Register')
const StaffRegisterRouter=express.Router()
StaffRegisterRouter.use(express.static('./public'))




StaffRegisterRouter.get('/staffreg',function(req,res)
{
res.render('fgfg')
})
StaffRegisterRouter.post('/staffregadd',function (req,res){
    const data={
        firstname:req.body.fname,
        lastname:req.body.lname,
        ID:req.body.staffID,
        designation:req.body.designation,
        department:req.body.dpmnt,
        year:req.body.year,
        dateofbirth:req.body.dob,
        gender:req.body.gender,
        phone:req.body.phn,
        email:req.body.email,
        password:req.body.pswd,
        confirmpassword:req.body.cpswd,
        Status:"0"

    }
    registermodel(data).save().then((details)=>{
        res.status(200).json({
            success:true,
            error:false,
            data:details,
            message:"Registration Completed"
        })
        console.log(data);
    
        })
    })
    

module.exports=StaffRegisterRouter

