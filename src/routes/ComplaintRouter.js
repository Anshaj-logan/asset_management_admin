const express = require('express')
const staffcomplaintmodel = require('../models/StaffComplaintData')
const complaintmodel = require('../models/ComplaintData')
const ComplaintRouter=express.Router()
ComplaintRouter.use(express.static('./public'))



ComplaintRouter.get('/viewstaffcomplaint', async(req,res)=>{
    try {
        const allData = await staffcomplaintmodel.find();
    res.render('viewstaffcomplaint',{allData})
    } catch (error) {
        
    }
    
})

ComplaintRouter.get('/viewstudentcomplaint',async(req,res)=>{
    try {
        const allData = await complaintmodel.find();
    res.render('viewstdcomplaint',{allData})
    } catch (error) {
        
    }
    
})





module.exports=ComplaintRouter