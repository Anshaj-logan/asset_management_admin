const express = require('express')
const workerregistermodel = require('../models/Registerworker')
const login = require('../models/Login')
const ProfileRouter = express.Router()

ProfileRouter.use(express.static('./public'))


ProfileRouter.get('/viewstudentprofile',(req,res)=>{
    res.render('Viewstdprofile')
})

ProfileRouter.get('/viewstaffprofile',(req,res)=>{
    res.render('Viewstaffprofile')
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



module.exports=ProfileRouter