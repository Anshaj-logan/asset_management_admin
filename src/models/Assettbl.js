const mongoose =require('mongoose')


const schema = mongoose.Schema

const assetSchema = new schema({
    category_id:{type:mongoose.Types.ObjectId,ref:"category_tb"},
    categoryname:{type:String},
    assetname:{type:String},
    totalquantity:{type:String},
    cost:{type:String},
    purchasedate:{type:String},
    Receipt:{type:String},
    image:{type:String}

})

const assetmodel = mongoose.model('asset_tb',assetSchema)

module.exports = assetmodel