const express = require('express')
const signinRouter = express.Router()
const bcrypt = require('bcryptjs')
const registerStudent = require('../../models/Registerstdnt')
const registerWorker = require('../../models/Registerworker')
const registerStaff = require('../../models/Register')
const login = require('../../models/Login')

// signinRouter.post("/admin-login", async (req, res) => {
//     const { username, password } = req.body;
// console.log(username);
//     try {
//         const oldUser = await login.findOne({ username })
//         console.log(oldUser);
//         if (!oldUser) return res.redirect('/admin')
//         const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
//         console.log("user", isPasswordCorrect);

//         if (!isPasswordCorrect) return res.redirect('/admin')

//         if (oldUser.role === '0') {
//                 const admin = await login.findOne({ _id: oldUser._id })
//                 if (admin) {
//                     return res.redirect('/admin/index')
//                 }           
//         }       
//     } catch (error) {
//         return res.status(500).redirect('/admin')
//     }
// })


signinRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    console.log(username);

    try {
        const oldUser = await login.findOne({ username })
        if (!oldUser) return res.status(404).json({ success: false, error: true, message: "User doesn't Exist" })
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
        console.log("user", oldUser.status);

        if (!isPasswordCorrect) return res.status(400).json({ success: false, error: true, message: "Incorrect password" })

        if (oldUser.role === '1') {
            if(oldUser.status === '0'){
                return res.status(400).json({ success: false, error: true,login_id: oldUser._id, message: "Waiting for admins approval" })
            }
            else{
                const userDetails = await registerStaff.findOne({ login_id: oldUser._id })
                console.log(userDetails);
                if (userDetails) {
                    return res.status(200).json({
                        success: true,
                        error: false,
                        username: oldUser.username,
                        role: oldUser.role,
                        status:oldUser.status,
                        login_id: oldUser._id,
                        staff_id: userDetails._id
                    })
                }
            }
           
        }
        else if (oldUser.role === '2') {
            if(oldUser.status === '0'){
                return res.status(400).json({ success: false, error: true,login_id: oldUser._id, message: "Waiting for admins approval" })
            }
            else{
                const studentDetails = await registerStudent.findOne({ login_id: oldUser._id })
                console.log(studentDetails);
                if (studentDetails) {
                    return res.status(200).json({
                        success: true,
                        error: false,
                        username: oldUser.username,
                        role: oldUser.role,
                        status:oldUser.status,
                        login_id: oldUser._id,
                        student_id: studentDetails._id
                    })
                }
            }
        }
        else if (oldUser.role === '3') {
            if(oldUser.status === '0'){
                return res.status(400).json({ success: false, error: true,login_id: oldUser._id, message: "Waiting for admins approval" })
            }
            else{
                const workerDetails = await registerWorker.findOne({ login_id: oldUser._id })
                console.log(workerDetails);
                if (workerDetails) {
                    return res.status(200).json({
                        success: true,
                        error: false,
                        username: oldUser.username,
                        role: oldUser.role,
                        status:oldUser.status,
                        login_id: oldUser._id,
                        worker_id: workerDetails._id
                    })
                }
            }
        }     
       
        else {

            return res.status(200).json({
                success: true,
                error: false,
                username: oldUser.username,
                login_id: oldUser._id,
                status:oldUser.status,
                role: oldUser.role,
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})


module.exports = signinRouter