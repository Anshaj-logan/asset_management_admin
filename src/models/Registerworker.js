const mongoose = require('mongoose')



const schema = mongoose.Schema

const registerworkerSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    name:{type:String},
    area:{type:String},
    phone_no:{type:String},
    email:{type:String},
   
})

const workerregistermodel = mongoose.model('registerworker_tb',registerworkerSchema)


module.exports = workerregistermodel