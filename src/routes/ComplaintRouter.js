const express = require('express')
const ComplaintRouter=express.Router()
ComplaintRouter.use(express.static('./public'))


ComplaintRouter.get('/viewstaffcomplaint',(req,res)=>{
    res.render('viewstaffcomplaint')
})

ComplaintRouter.get('/viewstudentcomplaint',(req,res)=>{
    res.render('viewstdcomplaint')
})





module.exports=ComplaintRouter