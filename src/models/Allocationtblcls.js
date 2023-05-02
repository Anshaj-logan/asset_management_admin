const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://akshayakalluvalappil4:akshayakalluvalappil4@cluster0.vfdbl9t.mongodb.net/Asset?retryWrites=true&w=majority')

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