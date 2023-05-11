const express = require('express')
const workerregistermodel = require('../models/Registerworker')
const login = require('../models/Login')
const staff = require('../models/Register')
const student = require('../models/Registerstdnt')
const loginData = require('../models/Login')
const ProfileRouter = express.Router()
const bcrypt = require('bcryptjs')
ProfileRouter.use(express.static('./public'))


ProfileRouter.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);

  try {
    const oldUser = await loginData.findOne({ username })
    console.log(oldUser);
    if (!oldUser) return res.redirect('/')
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
    console.log("user", isPasswordCorrect);

    if (!isPasswordCorrect) return res.redirect('/')

    if (oldUser.role === '0') {
            const admin = await loginData.findOne({ _id: oldUser._id })
            if (admin) {
                return res.redirect('/dashboard')
            }           
    }       
  } catch (error) {
      return res.status(500).redirect('/')
  }
})

ProfileRouter.get('/viewstudentprofile',async(req,res)=>{
  
    try {
      const data = await  login.aggregate([
        {
            '$lookup': {
              'from': 'registerstudent_tbs', 
              'localField': '_id', 
              'foreignField': 'login_id', 
              'as': 'data'
            }
          },
        {
          "$unwind": "$data"
        },
        {
          "$group": {
            "_id": "$_id",
            "user_id": { "$first": "$data._id" },
            "name": { "$first": "$data.name" },
            "email": { "$first": "$data.email" },
            "phone": { "$first": "$data.phone_no" },
            "email": { "$first": "$data.email" },
            "status": { "$first": "$status" },
          }
        }
  
      ])
    if(data){
      // res.json(data)
      res.render('Viewstdprofile',{data})
    }
    } catch (error) {
      
    }
})

ProfileRouter.get('/viewstaffprofile',async(req,res)=>{
  try {
    const data = await  login.aggregate([
      {
          '$lookup': {
            'from': 'registerstaff_tbs', 
            'localField': '_id', 
            'foreignField': 'login_id', 
            'as': 'data'
          }
        },
      {
        "$unwind": "$data"
      },
      {
        "$group": {
          "_id": "$_id",
          "user_id": { "$first": "$data._id" },
          "name": { "$first": "$data.name" },
          "department": { "$first": "$data.department" },
          "phone": { "$first": "$data.phone_no" },
          "email": { "$first": "$data.email" },
          "status": { "$first": "$status" },
        }
      }

    ])
  if(data){
    // res.json(staff)
    res.render('Viewstaffprofile',{data})
  }
  } catch (error) {
    
  }
   
})

ProfileRouter.get('/vieworkerprofile',async(req,res)=>{
try {
    const worker = await  login.aggregate([
        {
            '$lookup': {
              'from': 'registerworker_tbs', 
              'localField': '_id', 
              'foreignField': 'login_id', 
              'as': 'data'
            }
          },
        {
          "$unwind": "$data"
        },
        {
          "$group": {
            "_id": "$_id",
            "user_id": { "$first": "$data._id" },
            "name": { "$first": "$data.name" },
            "area": { "$first": "$data.area" },
            "phone": { "$first": "$data.phone_no" },
            "email": { "$first": "$data.email" },
            "status": { "$first": "$status" },
          }
        }
  
      ])
    if(worker){
        // res.json(worker)
        res.render('viewworkerprofile',{worker})
    }
    else{
        res.redirect('/profile/vieworkerprofile')
    }
} catch (error) {
    res.redirect('/profile/vieworkerprofile')
}
    
})


ProfileRouter.get("/approve-worker/:id", async (req, res) => {
    const id = req.params.id
    console.log(id);
    login.updateOne({ _id: id }, { $set: { status: "1" } }).then((details) => {
        
        res.redirect('/profile/vieworkerprofile')
        // res.status(500).json({ message: 'approved' })
    })

});

ProfileRouter.get("/approve-staff/:id", async (req, res) => {
  const id = req.params.id
  console.log(id);
  login.updateOne({ _id: id }, { $set: { status: "1" } }).then((details) => {
      
      res.redirect('/profile/viewstaffprofile')
      // res.status(500).json({ message: 'approved' })
  })

});


ProfileRouter.get("/approve-student/:id", async (req, res) => {
  const id = req.params.id
  console.log(id);
  login.updateOne({ _id: id }, { $set: { status: "1" } }).then((details) => {
      
      res.redirect('/profile/viewstudentprofile')
      // res.status(500).json({ message: 'approved' })
  })

});


ProfileRouter.get("/delete-worker/:id", async (req, res) => {
  const id = req.params.id
  console.log(id);
  login.deleteOne({ _id: id }).then((details) => {
    workerregistermodel.deleteOne({ login_id: id }).then((details) => {
      res.redirect('/profile/vieworkerprofile')
      // res.status(500).json({ message: 'approved' })
    })
      
  })

});


ProfileRouter.get("/delete-staff/:id", async (req, res) => {
  const id = req.params.id
  console.log(id);
  login.deleteOne({ _id: id }).then((details) => {
    staff.deleteOne({ login_id: id }).then((details) => {
      res.redirect('/profile/Viewstaffprofile')
    })
  })

});


ProfileRouter.get("/delete-student/:id", async (req, res) => {
  const id = req.params.id
  console.log(id);
  login.deleteOne({ _id: id }).then((details) => {
    student.deleteOne({ login_id: id }).then((details) => {
      res.redirect('/profile/viewstudentprofile')
    })
  })

});



module.exports=ProfileRouter