const mongoose = require('mongoose')



const schema = mongoose.Schema

const staffcomplaintSchema = new schema({
    staff_id:{type:mongoose.Types.ObjectId,ref:"registerstudent_tb"},
    department:{type:String},
    class:{type:String},
    room_number:{type:String},
    complaint:{type:String},
    image:{type:String},
    status:{type:String},


})

const staffcomplaintmodel = mongoose.model('staff_complaint_tb',staffcomplaintSchema)


module.exports = staffcomplaintmodel