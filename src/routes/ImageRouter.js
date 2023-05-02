const express = require('express')
const multer  = require('multer')
const gallerymodel = require('../models/Gallerytbl')
const ImageRouter=express.Router()
ImageRouter.use(express.static('./public'))

ImageRouter.get('/addimage',(req,res)=>{
    res.render('AddImage')
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/images/Uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


ImageRouter.get('/viewimage',async (req,res)=>{
    try {
        const data = await gallerymodel.find()
        res.render('ViewGallery',{data})
        
    } catch (error) {
        
    }
    
})



ImageRouter.post('/save-image',function (req,res){
    const data={
        Image:req.body.imagename
    }

    
    gallerymodel(data).save().then((data)=>{
        console.log(data);
    
        })

    })



module.exports=ImageRouter