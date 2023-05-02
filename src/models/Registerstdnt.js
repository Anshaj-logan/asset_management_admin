const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://akshayakalluvalappil4:akshayakalluvalappil4@cluster0.vfdbl9t.mongodb.net/Asset?retryWrites=true&w=majority')


const schema = mongoose.Schema

const registerstdntSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    firstname:{type:String},
    lastname:{type:String},
    regno:{type:String},
    department:{type:String},
    year:{type:String},
    dateofbirth:{type:String},
    gender:{type:String},
    phone:{type:String},
    email:{type:String},
    password:{type:String},
    confirmpassword:{type:String}

})

const studregistermodel = mongoose.model('registerstudent_tb',registerstdntSchema)


module.exports = studregistermodel