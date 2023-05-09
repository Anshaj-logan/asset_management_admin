const express = require('express')
const allocationRouter = express.Router()
const allocationclsmodel = require('../../models/Allocationtblcls');
const allocationothrmodel = require('../../models/Allocationtblothers');
const asset = require('../../models/Assettbl');


allocationRouter.get("/view-allocation-class", async (req, res) => {
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
                '$unwind': '$Asset'
            },
            {
                '$group':
                {
                    '_id': '$_id',
                    'department': { '$first': '$department' },
                    'Class': { '$first': '$Class' },
                    'Roomnumber': { '$first': '$Roomnumber' },
                    'allottedquantity': { '$first': '$allottedquantity' },
                    'assetname': { '$first': '$Asset.assetname' },
                }
            }
        ])
        if(data){
            res.status(200).json({
                success:true,
                error:false,
                data:data
            })
        }
    } catch (error) {
        res.status(400).json({
            success:false,
            error:true,
            message:"something went wrong"
        })
    }
}
);


allocationRouter.get("/view-allocation-other", async (req, res) => {
    try {
        const data = await allocationothrmodel.aggregate([
            {
                '$lookup': {
                    'from': 'asset_tbs',
                    'localField': 'asset_id',
                    'foreignField': '_id',
                    'as': 'Asset'
                }
            }, {
                '$unwind': '$Asset'
            },
            {
                '$group':
                {
                    '_id': '$_id',
                    'other': { '$first': '$other' },
                    'Roomnumber': { '$first': '$Roomnumber' },
                    'allottedquantity': { '$first': '$allottedquantity' },
                    'assetname': { '$first': '$Asset.assetname' },
                }
            }
        ])
        if(data){
            res.status(200).json({
                success:true,
                error:false,
                data:data
            })
        }
    } catch (error) {
        res.status(400).json({
            success:false,
            error:true,
            message:"something went wrong"
        })
    }
}
);


allocationRouter.get("/view-assets", async (req, res) => {
    try {
        const data = await asset.aggregate([
            {
                '$lookup': {
                    'from': 'category_tbs',
                    'localField': 'category_id',
                    'foreignField': '_id',
                    'as': 'Category'
                }
            }, {
                '$unwind': '$Category'
            },
            {
                '$group':
                {
                    '_id': '$_id',
                    'assetname': { '$first': '$assetname' },
                    'totalquantity': { '$first': '$totalquantity' },
                    'cost': { '$first': '$cost' },
                    'purchasedate': { '$first': '$purchasedate' },
                    'image': { '$first': '$image' },
                    'category': { '$first': '$Category.categoryname' },
                }
            }
        ])
        if(data){
            res.status(200).json({
                success:true,
                error:false,
                data:data
            })
        }
    } catch (error) {
        res.status(400).json({
            success:false,
            error:true,
            message:"something went wrong"
        })
    }
}
);

module.exports = allocationRouter