const mongoose =require('mongoose')


const schema = mongoose.Schema

const allocationotherSchema = new schema({
    asset_id:{type:mongoose.Types.ObjectId,ref:"asset_tb"},
    //year:{type:String},
    other:{type:String},
    Roomnumber:{type:String},
    allottedquantity:{type:String},
    //notworking:{type:String},
})



const allocationothermodel = mongoose.model('allocationother_tb',allocationotherSchema)

module.exports = allocationothermodel