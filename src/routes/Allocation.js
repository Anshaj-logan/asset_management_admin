const express = require('express')
const allocationclsmodel = require('../models/Allocationtblcls')
const assetmodel = require('../models/Assettbl')
const allocationmodelother = require('../models/Allocationtblothers')
//const categorymodel = require('../models/Categorytbl')
const Allocation = express.Router()
Allocation.use(express.static('./public'))


Allocation.get('/addallocationclass',async function(req,res){
    try {
        const data = await assetmodel.find()
        console.log(data);
        res.render('AddClsAllocation',{data})

    } catch (error) {
        
    }
})

Allocation.get('/addallocationother',async function(req,res){
    try {
        const data = await assetmodel.find()
        console.log(data);
        res.render('AddAllocationOthers',{data})

    } catch (error) {
        
    }
})

Allocation.get('/delete/:id', function (req, res) {
    const id = req.params.id
    allocationclsmodel.deleteOne({_id:id}).then((data) => {
        res.redirect('/viewallocation')
    })
})


Allocation.get('/:id',async function(req,res){
    const id=req.params.id
    try {
        const data=await assetmodel.find()
        const EditData=await allocationclsmodel.findOne({_id:id})
        res.render('ClsAllocationUpdate',{EditData,data})
    } catch (error) {
        
    }
})


    
Allocation.post('/updateallocationcls',function (req,res){
    const id=req.body._id
    const data={
        asset_id:req.body.asset_id,
        assetname:req.body.asset_name,
        department:req.body.department_name,
        Class:req.body.Class_name,
        allottedquantity:req.body.quantity_name,
        //notworking:req.body.notworking_name,
        image:req.body.imagename,
        Roomnumber:req.body.room_name
    }
    allocationclsmodel.updateOne({_id:id},{$set:data}).then((data)=>{
        res.redirect('/allocation/viewallocation')
        console.log(data);
    
        })
    })



    // /allocation/viewotherallocation
Allocation.get('/viewallocation', async function(req,res){
    try {
        const data = await allocationclsmodel.aggregate([
            {
              '$lookup': {
                'from': 'asset_tbs', 
                'localField': 'asset_id', 
                'foreignField': '_id', 
                'as': 'Asset'
              }
            }, {
                '$unwind' : '$Asset'
            },
            {
                '$group' :
            {
                '_id': '$_id',
                'department':{'$first':'$department'} ,
                'Class':{'$first':'$Class'} ,
                'Roomnumber':{'$first':'$Roomnumber'} ,
                'image':{'$first':'$image' },
                'allottedquantity':{'$first':'$allottedquantity'} ,
                'assetname':{'$first':'$Asset.assetname' },
            }
        }
          ])   
        res.render('ViewAllocation',{data})
    } catch (error) {
        
    }
})





Allocation.post('/allocationcls',function (req,res){
    const data={
        asset_id:req.body.asset_id,
        department:req.body.department_name,
        Class:req.body.Class_name,
        allottedquantity:req.body.quantity_name,
        Roomnumber:req.body.room_name
    }
    allocationclsmodel(data).save().then((data)=>{
        res.redirect('/viewallocation')
    
        })
    })
    

    Allocation.post('/allocationothersname',function (req,res){
        const data={
            asset_id:req.body.asset_id,
            other:req.body.other,
            Roomnumber:req.body.Roomnumber,
            allottedquantity:req.body.quantity_name,
        }
        allocationmodelother(data).save().then((data)=>{
            res.redirect('/viewallocationother')
        
            })
        })


      

module.exports=Allocation