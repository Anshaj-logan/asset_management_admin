const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://akshayakalluvalappil4:akshayakalluvalappil4@cluster0.vfdbl9t.mongodb.net/Asset?retryWrites=true&w=majority')


const schema = mongoose.Schema

const registerstaffSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    firstname:{type:String},
    lastname:{type:String},
    ID:{type:String},
    designation:{type:String},
    department:{type:String},
    year:{type:String},
    dateofbirth:{type:String},
    gender:{type:String},
    phone:{type:String},
    email:{type:String},
    Status:{type:String}

})

const registermodel = mongoose.model('registerstaff_tb',registerstaffSchema)


module.exports = registermodel