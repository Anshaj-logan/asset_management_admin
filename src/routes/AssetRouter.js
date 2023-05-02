const express = require('express')
const assetmodel = require('../models/Assettbl')
const categorymodel = require('../models/Categorytbl')
const AssetRouter=express.Router()
AssetRouter.use(express.static('./public'))



AssetRouter.get('/addasset', async function(req,res){
    try {
        const data = await categorymodel.find()
        res.render('AssetManage',{data})       
    } catch (error) {
        
    }
    
})


AssetRouter.get('/:id',async function(req,res){
    const id=req.params.id
    try {
        const data=await categorymodel.find()
        const EditData=await assetmodel.findOne({_id:id})
        res.render('AssetManageUpdate',{EditData,data})
    } catch (error) {
        
    }
})


AssetRouter.get('/viewasset', async function(req,res){
    try {
        console.log('$unwind');
        const  data = await assetmodel.aggregate([
            {
              '$lookup': {
                'from': 'category_tbs', 
                'localField': 'category_id', 
                'foreignField': '_id', 
                'as': 'category'
              }
            },
            {
                '$unwind' : '$category'
            },
            {
                '$group' :
                {
                    '_id': '$_id',
                    'assetname':{'$first':'$assetname'} ,
                    'purchasedate':{'$first':'$purchasedate'} ,
                    'Receipt':{'$first':'$Receipt'} ,
                    'totalquantity':{'$first':'$totalquantity'} ,
                    'cost':{'$first':'$cost'} ,
                    'image':{'$first':'$image'} ,

                    'categoryname':{'$first':'$category.categoryname'} ,
                }
            }



          ])

 res.json({data:data})
  //      res.render('ViewAsset',{data})
        
    } catch (error) {
        console.log('categoryname');
    }
    
})


AssetRouter.post('/save-asset',function (req,res){
    const data={
        category_id:req.body.category_id,
        categoryname:req.body.category_name,
        assetname:req.body.assetname,
        totalquantity:req.body.totalquantity,
        cost:req.body.price,
        purchasedate:req.body.purchasedate,
        Receipt:req.body.receiptname,
        image:req.body.filename

    }
    assetmodel(data).save().then((data)=>{
        console.log(data);
    
        })
})

AssetRouter.post('/update-asset',function (req,res){
    const id=req.body._id
    const data={
        category_id:req.body.category_id,
        categoryname:req.body.category_name,
        assetname:req.body.assetname,
        totalquantity:req.body.totalquantity,
        cost:req.body.price,
        purchasedate:req.body.purchasedate,
        Receipt:req.body.receiptname,
        image:req.body.filename

    }
    assetmodel.updateOne({_id:id},{$set:data}).then((data)=>{
        res.redirect('/asset/viewasset')
        console.log(data);
    
        })
})


module.exports=AssetRouter
