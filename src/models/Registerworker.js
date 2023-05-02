const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://akshayakalluvalappil4:akshayakalluvalappil4@cluster0.vfdbl9t.mongodb.net/Asset?retryWrites=true&w=majority')


const schema = mongoose.Schema

const registerworkerSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    firstname:{type:String},
    lastname:{type:String},
    workingfield:{type:String},
    dateofbirth:{type:String},
    gender:{type:String},
    phone:{type:String},
    email:{type:String},
   
})

const workerregistermodel = mongoose.model('registerworker_tb',registerworkerSchema)


module.exports = workerregistermodel