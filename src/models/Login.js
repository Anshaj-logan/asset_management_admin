const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://akshayakalluvalappil4:akshayakalluvalappil4@cluster0.vfdbl9t.mongodb.net/Asset?retryWrites=true&w=majority')


const schema = mongoose.Schema()

const loginSchema = new schema({
    loginid:{type:String},
    password:{type:String},
    role:{type:String},
    status:{type:String}

})

const loginmodel = mongoose.model('login_tb',loginSchema)

module.exports = loginmodel
