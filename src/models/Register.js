const mongoose = require('mongoose')



const schema = mongoose.Schema

const registerstaffSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    name:{type:String},
    department:{type:String},
    phone_no:{type:String},
    email:{type:String},
    Status:{type:String}

})

const registermodel = mongoose.model('registerstaff_tb',registerstaffSchema)


module.exports = registermodel