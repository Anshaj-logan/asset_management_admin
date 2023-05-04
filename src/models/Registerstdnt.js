const mongoose = require('mongoose')



const schema = mongoose.Schema

const registerstdntSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    name:{type:String},
    reg_no:{type:String},
    department:{type:String},
    year:{type:String},
    phone_no:{type:String},
    email:{type:String},
   

})

const studregistermodel = mongoose.model('registerstudent_tb',registerstdntSchema)


module.exports = studregistermodel