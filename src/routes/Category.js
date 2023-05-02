const express = require('express')
const categorymodel = require('../models/Categorytbl')
const Category = express.Router()
Category.use(express.static('./public'))


Category.get('/addcategory',function (req,res){
    res.render('Addcategory')
})

Category.get('/viewcategory',async function (req,res){
    try {
        const data = await categorymodel.find()
        console.log(data);
        res.render('ViewCategory',{data})
    } catch (error) {
        
    }
   
})

Category.post('/category-name',function (req,res){
    const data={
        categoryname:req.body.category_name
    }

categorymodel(data).save().then((data)=>{
    console.log(data);

    })
})



module.exports=Category