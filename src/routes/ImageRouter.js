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
      cb(null, '../client/public/gallery')
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


ImageRouter.post('/save-image', upload.array('images', 10), async (req, res) => {
    try {
      const files = req.files;
      const images = [];
  
      for (let i = 0; i < files.length; i++) {
        const image = new gallerymodel({
          Image: files[i].originalname,
        //   path: files[i].path
        });
  
        images.push(await image.save());
      }
  
      res.redirect('/image/viewimage');
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });


  ImageRouter.get('/delete/:id', function (req, res) {
    const id = req.params.id
    gallerymodel.deleteOne({_id:id}).then((data) => {
        res.redirect('/image/viewimage');
    })
})

// ImageRouter.post('/save-image',function (req,res){
//     const data={
//         Image:req.body.imagename
//     }

    
//     gallerymodel(data).save().then((data)=>{
//         console.log(data);
    
//         })

//     })



module.exports=ImageRouter