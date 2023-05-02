const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://akshayakalluvalappil4:akshayakalluvalappil4@cluster0.vfdbl9t.mongodb.net/Asset?retryWrites=true&w=majority')

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