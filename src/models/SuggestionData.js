const mongoose = require('mongoose')



const schema = mongoose.Schema

const suggestionSchema = new schema({
    student_id:{type:mongoose.Types.ObjectId,ref:"registerstudent_tb"},
    department:{type:String},
    class:{type:String},
    room_number:{type:String},
    suggestion:{type:String},
   


})

const suggestionSchemamodel = mongoose.model('suggestionSchema_tb',suggestionSchema)


module.exports = suggestionSchemamodel