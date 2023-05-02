const express = require('express')
const allocationothermodel = require('../models/Allocationtblothers')
const assetmodel = require('../models/Assettbl')
const OtherAllocationRouter=express.Router()

OtherAllocationRouter.use(express.static('./public'))

OtherAllocationRouter.get('/addallocationother',async function(req,res){
    try {
        const data = await assetmodel.find()
        res.render('AddAllocationOthers',{data})
    } catch (error) {
        
    }
    
})


OtherAllocationRouter.get('/viewotherallocation', async function(req,res){
    try {
        const data = await allocationothermodel.aggregate(
            [
                {
                    '$lookup': {
                        'from': 'asset_tbs', 
                        'localField': 'asset_id', 
                        'foreignField': '_id', 
                        'as': 'assets'
                    }
                },
           
            {
                '$unwind' : '$assets'
            },
            {
                '$group' :
            {               
                 '_id': '$_id',
                 'other':{'$first':'$other'} ,
                 'Roomnumber':{'$first':'$Roomnumber'} ,
                 'allottedquantity':{'$first':'$allottedquantity'} ,
                 'Image':{'$first':'$Image'} ,
                 'assetname':{'$first':'$assets.assetname' },


            }
        }
    ])   
        res.render('ViewOtherAllocation',{data})
    } catch (error) {        
    }
})


OtherAllocationRouter.post('/allocationothersname',function (req,res){
    const data={
        asset_id:req.body.asset_id,
        assetname:req.body.asset_name,
        other:req.body.othername,
        allottedquantity:req.body.allotedquantity,
        Image:req.body.imagename,
        Roomnumber:req.body.roomnumber
    }
    allocationothermodel(data).save().then((data)=>{
        console.log(data);
    
        })
    })


   // OtherAllocationRouter.get('/:id',async function(req,res){
   //     const id=req.params.id
   //     try {
    //        const data=await assetmodel.find()
    //        const EditData=await allocationothermodel.findOne({_id:id})
    //        res.render('AllocationOtherUpdate',{EditData,data})
    //    } catch (error) {
            
    //    }
  //  })
    
   
    
    // OtherAllocationRouter.post('/otheralloction-update',async function (req,res){
        // console.log(req.body);
        //        const id=req.body._id

        //        const data={
            //    asset_id:req.body.asset_id,
            //      assetname:req.body.asset_name,
            //     other:req.body.othername,
            //     allottedquantity:req.body.allotedquantity,
            //     Image:req.body.imagename,
            //    Roomnumber:req.body.roomnumber
            //  }
       
            //    allocationothermodel.updateOne({_id:id},{$set:data}).then((response)=>{
                //  res.redirect('/otheralloction/viewotherallocation')
                //  console.log(data);
        
                //   })
                //   }) 

    




module.exports=OtherAllocationRouter
