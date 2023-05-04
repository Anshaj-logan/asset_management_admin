const express = require('express')
const bcrypt = require('bcryptjs')


const staffReg = require('../../models/Register')
const login = require('../../models/Login')
const studentReg = require('../../models/Registerstdnt')
const workerReg = require('../../models/Registerworker')


const registerRouter = express.Router()

registerRouter.post('/staff', async (req,res) => {
    try{
        const userExists = await login.findOne({username: req.body.username })
        
        
        if(userExists){
            return res.status(400).json({ success:false,error:true, message: 'user already registered'})
        }        
        console.log(req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const oldPhone = await staffReg.findOne({ phonenumber: req.body.phone_no }) 
        if(oldPhone){
            return res.status(400).json({ success:false,error:true, message: 'phone number already exists '}) 
        } 
        const oldEmail = await staffReg.findOne({ email: req.body.email }) 
        if(oldEmail){
            return res.status(400).json({ success:false,error:true, message: 'email already exists '}) 
        }  
        var log = {
            username: req.body.username,
            password: hashedPassword,
            role: 1,
            status: 0,
        }
        const result = await login(log).save()
        var reg = {
            login_id:result._id,
            name: req.body.name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            department: req.body.department,
            
            
        }
        const result2 = await staffReg(reg).save()
        res.status(201).json({
            success:true,error:false,
            result: result2,
            message: 'Successfully Registered'
        })

    }
    catch(err){
        res.status(500).json({success:false,error:true, message: 'Something Went Wrong'})
        console.log(err)
    }
})

registerRouter.post('/student', async (req,res) => {
    try{
        const userExists = await login.findOne({username: req.body.username })
        
        
        if(userExists){
            return res.status(400).json({ success:false,error:true, message: 'user already registered'})
        }        
        console.log(req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password,12)

        const oldPhone = await studentReg.findOne({ phonenumber: req.body.phone_no }) 
        if(oldPhone){
            return res.status(400).json({ success:false,error:true, message: 'phone number already exists '}) 
        } 
        const oldEmail = await studentReg.findOne({ email: req.body.email }) 
        if(oldEmail){
            return res.status(400).json({ success:false,error:true, message: 'email already exists '}) 
        }  
        var log = {
            username: req.body.username,
            password: hashedPassword,
            role: 2,
            status: 0,
        }
        const result = await login(log).save()
        var reg = {
            login_id:result._id,
            name: req.body.name,
            reg_no:req.body.reg_no,
            email: req.body.email,
            phone_no: req.body.phone_no,
            year:req.body.year,
            department: req.body.house_name,
            
            
        }
        const result2 = await studentReg(reg).save()
        res.status(201).json({
            success:true,error:false,
            result: result2,
            message: 'Successfully Registered'
        })

    }
    catch(err){
        res.status(500).json({success:false,error:true, message: 'Something Went Wrong'})
        console.log(err)
    }
})

registerRouter.post('/worker', async (req,res) => {
    try{
        const userExists = await login.findOne({username: req.body.username })
        
        
        if(userExists){
            return res.status(400).json({ success:false,error:true, message: 'user already registered'})
        }        
        console.log(req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const oldPhone = await workerReg.findOne({ phonenumber: req.body.phone_no }) 
        if(oldPhone){
            return res.status(400).json({ success:false,error:true, message: 'phone number already exists '}) 
        } 
        const oldEmail = await workerReg.findOne({ email: req.body.email }) 
        if(oldEmail){
            return res.status(400).json({ success:false,error:true, message: 'email already exists '}) 
        }  
        var log = {
            username: req.body.username,
            password: hashedPassword,
            role: 3,
            status: 0,
        }
        const result = await login(log).save()
        var reg = {
            login_id:result._id,
            name: req.body.name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            area: req.body.area,
            
            
        }
        const result2 = await workerReg(reg).save()
        res.status(201).json({
            success:true,error:false,
            result: result2,
            message: 'Successfully Registered'
        })

    }
    catch(err){
        res.status(500).json({success:false,error:true, message: 'Something Went Wrong'})
        console.log(err)
    }
})


module.exports = registerRouter