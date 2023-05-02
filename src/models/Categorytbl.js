const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://akshayakalluvalappil4:akshayakalluvalappil4@cluster0.vfdbl9t.mongodb.net/Asset?retryWrites=true&w=majority')


const schema=mongoose.Schema

const categorySchema=new schema({
    categoryname:{type:String},
    

})

const categorymodel = mongoose.model('category_tb',categorySchema)

module.exports = categorymodel
