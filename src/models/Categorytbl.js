const mongoose = require('mongoose')



const schema=mongoose.Schema

const categorySchema=new schema({
    categoryname:{type:String},
    

})

const categorymodel = mongoose.model('category_tb',categorySchema)

module.exports = categorymodel
