const mongoose = require('mongoose')



const schema = mongoose.Schema

const complaintSchema = new schema({
    student_id:{type:mongoose.Types.ObjectId,ref:"registerstudent_tb"},
    department:{type:String},
    class:{type:String},
    room_number:{type:String},
    complaint:{type:String},
    image:{type:String},
    status:{type:String},


})

const complaintmodel = mongoose.model('complaint_tb',complaintSchema)


module.exports = complaintmodel