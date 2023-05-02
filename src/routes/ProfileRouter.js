const express = require('express')
const ProfileRouter = express.Router()
ProfileRouter.use(express.static('./public'))


ProfileRouter.get('/viewstudentprofile',(req,res)=>{
    res.render('Viewstdprofile')
})

ProfileRouter.get('/viewstaffprofile',(req,res)=>{
    res.render('Viewstaffprofile')
})

ProfileRouter.get('/vieworkerprofile',(req,res)=>{
    res.render('viewworkerprofile')
})



module.exports=ProfileRouter