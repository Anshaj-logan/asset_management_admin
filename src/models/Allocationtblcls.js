const mongoose =require('mongoose')


const schema = mongoose.Schema

const allocationclsSchema = new schema({
    asset_id:{type:mongoose.Types.ObjectId,ref:"asset_tb"},
    assetname:{type:String},
    department:{type:String},
    Class:{type:String},
    Roomnumber:{type:String},
    allottedquantity:{type:String},
    image:{type:String}
})

const allocationclsmodel = mongoose.model('allocationcls_tb',allocationclsSchema)

module.exports = allocationclsmodel